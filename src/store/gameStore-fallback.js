// Fallback game store using localStorage polling
// This works on Vercel but only for same device (different tabs)
// For cross-device sync, you MUST use Socket.IO with Render/Railway

import { create } from 'zustand'
import questionsData from '../data/questions.json'

const defaultQuestions = questionsData

const STORAGE_KEY = 'family-feud-game-state'
const POLL_INTERVAL = 500 // Check for updates every 500ms

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
    lastUpdate: Date.now()
}

const useGameStore = create((set, get) => {
    // Load initial state from localStorage
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                set(parsed)
            } catch (e) {
                console.error('Failed to parse saved state:', e)
            }
        }

        // Poll for changes from other tabs
        setInterval(() => {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    const current = get()

                    // Only update if state is newer
                    if (parsed.lastUpdate > current.lastUpdate) {
                        console.log('📥 Synced state from another tab')
                        set(parsed)
                    }
                } catch (e) {
                    console.error('Failed to sync state:', e)
                }
            }
        }, POLL_INTERVAL)
    }

    const saveState = (newState) => {
        const stateWithTimestamp = {
            ...newState,
            lastUpdate: Date.now()
        }
        set(stateWithTimestamp)
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithTimestamp))
            console.log('📤 State saved to localStorage')
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

                const audio = new Audio('/correct.mp3')
                audio.play().catch(e => console.error('Error playing sound:', e))

                saveState({
                    ...state,
                    questions,
                    currentBank,
                    lastAction: { type: 'reveal', index: answerIndex }
                })
            }
        },

        addStrike: () => {
            const state = get()
            const teams = state.teams.map(team =>
                team.id === state.activeTeamId
                    ? { ...team, strikes: Math.min(team.strikes + 1, 3) }
                    : team
            )

            const audio = new Audio('/wrong.mp3')
            audio.play().catch(e => console.error('Error playing sound:', e))

            saveState({
                ...state,
                teams,
                lastAction: { type: 'strike', teamId: state.activeTeamId }
            })
        },

        setActiveTeam: (teamId) => {
            const state = get()
            saveState({
                ...state,
                activeTeamId: teamId,
                lastAction: { type: 'set-active-team', teamId }
            })
        },

        clearTeamStrikes: (teamId) => {
            const state = get()
            const teams = state.teams.map(team =>
                team.id === teamId ? { ...team, strikes: 0 } : team
            )
            saveState({
                ...state,
                teams,
                lastAction: { type: 'clear-strikes', teamId }
            })
        },

        awardToTeam: (teamId) => {
            const state = get()
            const teams = state.teams.map(team =>
                team.id === teamId
                    ? { ...team, score: team.score + state.currentBank, strikes: 0 }
                    : team
            )
            saveState({
                ...state,
                teams,
                currentBank: 0,
                lastAction: { type: 'award', team: teamId }
            })
        },

        updateTeams: (teams) => {
            const state = get()
            saveState({
                ...state,
                teams,
                lastAction: { type: 'update-teams' }
            })
        },

        nextQuestion: () => {
            const state = get()
            const nextIndex = (state.currentQuestionIndex + 1) % state.questions.length
            const teams = state.teams.map(t => ({ ...t, strikes: 0 }))
            saveState({
                ...state,
                currentQuestionIndex: nextIndex,
                teams,
                currentBank: 0,
                lastAction: { type: 'next' }
            })
        },

        resetRound: () => {
            const state = get()
            const questions = [...state.questions]
            const currentQuestion = { ...questions[state.currentQuestionIndex] }
            currentQuestion.answers = currentQuestion.answers.map(a => ({ ...a, revealed: false }))
            questions[state.currentQuestionIndex] = currentQuestion
            const teams = state.teams.map(t => ({ ...t, strikes: 0 }))
            saveState({
                ...state,
                questions,
                teams,
                currentBank: 0,
                lastAction: { type: 'reset' }
            })
        },

        loadQuestions: (questionsData) => {
            const state = get()
            saveState({
                ...state,
                questions: questionsData,
                currentQuestionIndex: 0,
                currentBank: 0,
                lastAction: { type: 'load' }
            })
        },

        getCurrentQuestion: () => {
            const state = get()
            return state.questions[state.currentQuestionIndex]
        },

        reconnectParty: () => {
            console.log('⚠️ Using localStorage fallback - no socket connection')
            console.log('ℹ️ This only works on the same device (different tabs)')
            console.log('ℹ️ For cross-device sync, deploy Socket.IO to Render')
        }
    }
})

export default useGameStore
