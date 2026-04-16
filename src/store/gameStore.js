import { create } from 'zustand'
import questionsData from '../data/questions.json'
import { initSocket, getSocket, isSocketConnected } from '../utils/socket'

const defaultQuestions = questionsData

// Auto-detect socket URL based on current host
// In production, set VITE_SOCKET_URL environment variable
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:3001`)

const initialState = {
    questions: defaultQuestions,
    currentQuestionIndex: 0,
    teams: [
        { id: 1, name: 'Team 1', score: 0, strikes: 0 },
        { id: 2, name: 'Team 2', score: 0, strikes: 0 }
    ],
    currentBank: 0,
    activeTeamId: 1,
    lastAction: null,
}

const useGameStore = create((set, get) => {
    // Initialize socket connection (only in browser)
    if (typeof window !== 'undefined') {
        initSocket(SOCKET_URL).then((socket) => {
            if (!socket) return

            socket.on('connect', () => {
                console.log('✅ Connected to game server')
                const partyCode = localStorage.getItem('partyCode')
                if (partyCode) {
                    socket.emit('join-party', partyCode)
                    console.log('🎮 Joined party:', partyCode)
                } else {
                    console.warn('⚠️ No party code found in localStorage')
                }
            })

            socket.on('game-state', (state) => {
                console.log('📥 Received state update:', state.lastAction?.type || 'full-state')
                set(state)
            })

            socket.on('disconnect', (reason) => {
                console.log('❌ Disconnected from server. Reason:', reason)
                // Auto-reconnect if not intentional disconnect
                if (reason === 'io server disconnect') {
                    // Server disconnected, manually reconnect
                    socket.connect()
                }
            })

            socket.on('connect_error', (error) => {
                console.error('Connection error:', error)
            })

            socket.on('reconnect', (attemptNumber) => {
                console.log('🔄 Reconnected after', attemptNumber, 'attempts')
                const partyCode = localStorage.getItem('partyCode')
                if (partyCode) {
                    socket.emit('join-party', partyCode)
                }
            })

            socket.on('reconnect_attempt', (attemptNumber) => {
                console.log('🔄 Reconnection attempt', attemptNumber)
            })

            socket.on('reconnect_error', (error) => {
                console.error('❌ Reconnection error:', error)
            })

            socket.on('reconnect_failed', () => {
                console.error('❌ Reconnection failed')
            })
        })
    }

    const broadcast = (newState) => {
        const socket = getSocket()
        const partyCode = localStorage.getItem('partyCode')
        if (socket && isSocketConnected() && partyCode) {
            socket.emit('update-state', { partyCode, state: newState })
            console.log('📤 Broadcasting state to party:', partyCode, 'Action:', newState.lastAction?.type)
        } else {
            console.warn('⚠️ Cannot broadcast - Socket:', isSocketConnected(), 'Party:', partyCode)
        }
    }

    return {
        ...initialState,

        revealAnswer: (answerIndex) => {
            const state = get()
            const questions = [...state.questions]
            const currentQuestion = { ...questions[state.currentQuestionIndex] }
            const answers = [...currentQuestion.answers]

            if (answers[answerIndex] && !answers[answerIndex].revealed) {
                answers[answerIndex] = { ...answers[answerIndex], revealed: true }
                currentQuestion.answers = answers
                questions[state.currentQuestionIndex] = currentQuestion

                const currentBank = state.currentBank + answers[answerIndex].points

                // Play correct sound
                const audio = new Audio('/correct.mp3')
                audio.play().catch(e => console.error('Error playing correct sound:', e))

                const newState = {
                    ...state,
                    questions,
                    currentBank,
                    lastAction: { type: 'reveal', index: answerIndex, timestamp: Date.now() }
                }

                set(newState)
                broadcast(newState)
            }
        },

        addStrike: () => {
            const state = get()
            const teams = state.teams.map(team =>
                team.id === state.activeTeamId
                    ? { ...team, strikes: Math.min(team.strikes + 1, 3) }
                    : team
            )

            const activeTeam = teams.find(t => t.id === state.activeTeamId)

            // Play wrong sound
            const audio = new Audio('/wrong.mp3')
            audio.play().catch(e => console.error('Error playing wrong sound:', e))

            const newState = {
                ...state,
                teams,
                lastAction: { type: 'strike', teamId: state.activeTeamId, timestamp: Date.now() }
            }

            set(newState)
            broadcast(newState)

            // Auto-clear the 3-strike overlay after 3 seconds
            if (activeTeam && activeTeam.strikes === 2) {
                setTimeout(() => {
                    const currentState = get()
                    const currentTeam = currentState.teams.find(t => t.id === state.activeTeamId)
                    if (currentTeam && currentTeam.strikes === 3) {
                        const clearedTeams = currentState.teams.map(t =>
                            t.id === state.activeTeamId ? { ...t, strikes: 0 } : t
                        )
                        const clearedState = {
                            ...currentState,
                            teams: clearedTeams,
                            lastAction: { type: 'auto-clear-strikes', timestamp: Date.now() }
                        }
                        set(clearedState)
                        broadcast(clearedState)
                    }
                }, 3000)
            }
        },

        setActiveTeam: (teamId) => {
            const state = get()
            const newState = {
                ...state,
                activeTeamId: teamId,
                lastAction: { type: 'set-active-team', teamId, timestamp: Date.now() }
            }
            set(newState)
            broadcast(newState)
        },

        clearTeamStrikes: (teamId) => {
            const state = get()
            const teams = state.teams.map(team =>
                team.id === teamId ? { ...team, strikes: 0 } : team
            )
            const newState = {
                ...state,
                teams,
                lastAction: { type: 'clear-strikes', teamId, timestamp: Date.now() }
            }
            set(newState)
            broadcast(newState)
        },

        awardToTeam: (teamId) => {
            const state = get()
            const teams = state.teams.map(team =>
                team.id === teamId
                    ? { ...team, score: team.score + state.currentBank, strikes: 0 }
                    : team
            )

            const newState = {
                ...state,
                teams,
                currentBank: 0,
                lastAction: { type: 'award', team: teamId, timestamp: Date.now() }
            }

            set(newState)
            broadcast(newState)
        },

        updateTeams: (teams) => {
            const state = get()
            const updatedTeams = teams.map(newTeam => {
                const existingTeam = state.teams.find(t => t.id === newTeam.id)
                return {
                    ...newTeam,
                    strikes: existingTeam?.strikes || 0
                }
            })
            const newState = {
                ...state,
                teams: updatedTeams,
                lastAction: { type: 'update-teams', timestamp: Date.now() }
            }

            set(newState)
            broadcast(newState)
        },

        nextQuestion: () => {
            const state = get()
            const nextIndex = (state.currentQuestionIndex + 1) % state.questions.length
            const teams = state.teams.map(t => ({ ...t, strikes: 0 }))

            const newState = {
                ...state,
                currentQuestionIndex: nextIndex,
                teams,
                currentBank: 0,
                lastAction: { type: 'next', timestamp: Date.now() }
            }

            set(newState)
            broadcast(newState)
        },

        resetRound: () => {
            const state = get()
            const questions = [...state.questions]
            const currentQuestion = { ...questions[state.currentQuestionIndex] }
            currentQuestion.answers = currentQuestion.answers.map(a => ({ ...a, revealed: false }))
            questions[state.currentQuestionIndex] = currentQuestion

            const teams = state.teams.map(t => ({ ...t, strikes: 0 }))

            const newState = {
                ...state,
                questions,
                teams,
                currentBank: 0,
                lastAction: { type: 'reset', timestamp: Date.now() }
            }

            set(newState)
            broadcast(newState)
        },

        loadQuestions: (questionsData) => {
            const state = get()
            const newState = {
                ...state,
                questions: questionsData,
                currentQuestionIndex: 0,
                currentBank: 0,
                lastAction: { type: 'load', timestamp: Date.now() }
            }

            set(newState)
            broadcast(newState)
        },

        getCurrentQuestion: () => {
            const state = get()
            return state.questions[state.currentQuestionIndex]
        },

        // Reconnect to party (useful after page refresh)
        reconnectParty: () => {
            const socket = getSocket()
            const partyCode = localStorage.getItem('partyCode')
            if (socket && partyCode) {
                console.log('🔄 Reconnecting to party:', partyCode)
                socket.emit('join-party', partyCode)
            } else {
                console.warn('⚠️ Cannot reconnect - Socket:', !!socket, 'Party:', partyCode)
            }
        }
    }
})

export default useGameStore
