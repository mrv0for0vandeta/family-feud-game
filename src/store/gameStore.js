import { create } from 'zustand'
import questionsData from '../data/questions.json'

const STORAGE_KEY = 'family-feud-state'
const BROADCAST_CHANNEL = 'family-feud-sync'

const defaultQuestions = questionsData

const loadState = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : null
    } catch {
        return null
    }
}

const saveState = (state) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
        console.error('Failed to save state:', e)
    }
}

const initialState = loadState() || {
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

// Create BroadcastChannel outside the store
let channel = null
try {
    channel = new BroadcastChannel(BROADCAST_CHANNEL)
} catch (e) {
    console.warn('BroadcastChannel not supported:', e)
}

const useGameStore = create((set, get) => {
    // Listen to BroadcastChannel messages
    if (channel) {
        channel.onmessage = (event) => {
            console.log('Received broadcast:', event.data)
            set(event.data)
        }
    }

    // Listen to localStorage changes (fallback for cross-tab sync)
    if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    const newState = JSON.parse(e.newValue)
                    console.log('Received storage event:', newState)
                    set(newState)
                } catch (err) {
                    console.error('Failed to parse storage event:', err)
                }
            }
        })
    }

    const broadcast = (newState) => {
        console.log('Broadcasting state:', newState)
        saveState(newState)
        if (channel) {
            try {
                channel.postMessage(newState)
            } catch (e) {
                console.error('Failed to broadcast:', e)
            }
        }
        // Trigger storage event manually for same-tab updates
        window.dispatchEvent(new StorageEvent('storage', {
            key: STORAGE_KEY,
            newValue: JSON.stringify(newState)
        }))
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
            if (activeTeam && activeTeam.strikes === 2) { // Will become 3 after update
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
            // Preserve strikes when updating teams
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
            // Clear all team strikes when moving to next question
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

            // Clear all team strikes
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
        }
    }
})

export default useGameStore
