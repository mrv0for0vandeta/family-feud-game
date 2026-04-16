import { useEffect, useState } from 'react'
import { ExternalLink, RotateCcw, Trophy, AlertCircle, SkipForward, Edit3, Gamepad2, Users, Wifi, WifiOff } from 'lucide-react'
import useGameStore from '../store/gameStore'
import AudioManager from '../components/AudioManager'
import QuestionEditor from '../components/QuestionEditor'
import TeamConfig from '../components/TeamConfig'
import { getSocket, isSocketConnected } from '../utils/socket'

function HostView() {
    const {
        getCurrentQuestion,
        revealAnswer,
        addStrike,
        awardToTeam,
        nextQuestion,
        resetRound,
        setActiveTeam,
        clearTeamStrikes,
        teams,
        activeTeamId,
        currentBank,
        reconnectParty
    } = useGameStore()

    const currentQuestion = getCurrentQuestion()
    const [view, setView] = useState('game')
    const [socketStatus, setSocketStatus] = useState({ connected: false, id: null })

    // Check socket status periodically
    useEffect(() => {
        const checkSocket = () => {
            const socket = getSocket()
            setSocketStatus({
                connected: isSocketConnected(),
                id: socket?.id || null
            })
        }

        checkSocket()
        const interval = setInterval(checkSocket, 1000)
        return () => clearInterval(interval)
    }, [])

    // Reconnect to party when component mounts
    useEffect(() => {
        reconnectParty()
    }, [reconnectParty])

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (view !== 'game') return

            if (e.key >= '1' && e.key <= '8') {
                const index = parseInt(e.key) - 1
                if (currentQuestion.answers[index]) {
                    revealAnswer(index)
                }
            }

            if (e.key.toLowerCase() === 'x') {
                addStrike()
            }

            if (e.key === ' ' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [currentQuestion, revealAnswer, addStrike, view])

    const openBoard = () => {
        window.open('/board', '_blank', 'width=1920,height=1080')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-feud-gold mb-2">Family Feud - Host Control</h1>
                        <div className="flex gap-3 items-center">
                            <div className="bg-orange-600 border-2 border-yellow-400 rounded-lg px-4 py-2 inline-block">
                                <span className="text-sm text-yellow-200 font-semibold mr-2">PARTY CODE:</span>
                                <span className="text-2xl font-bold text-white tracking-widest">
                                    {localStorage.getItem('partyCode') || 'N/A'}
                                </span>
                            </div>
                            <div className={`border-2 rounded-lg px-4 py-2 inline-flex items-center gap-2 ${socketStatus.connected ? 'bg-green-600 border-green-400' : 'bg-red-600 border-red-400'}`}>
                                {socketStatus.connected ? <Wifi size={20} /> : <WifiOff size={20} />}
                                <span className="text-sm font-semibold">
                                    {socketStatus.connected ? 'Connected' : 'Disconnected'}
                                </span>
                            </div>
                            {!socketStatus.connected && (
                                <button
                                    onClick={() => {
                                        console.log('🔄 Manual reconnect triggered')
                                        reconnectParty()
                                    }}
                                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold text-sm"
                                >
                                    Reconnect
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setView('game')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${view === 'game' ? 'bg-green-600' : 'bg-gray-600'}`}
                        >
                            <Gamepad2 size={20} />
                            Game
                        </button>
                        <button
                            onClick={() => setView('editor')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${view === 'editor' ? 'bg-purple-600' : 'bg-gray-600'}`}
                        >
                            <Edit3 size={20} />
                            Questions
                        </button>
                        <button
                            onClick={() => setView('teams')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${view === 'teams' ? 'bg-orange-600' : 'bg-gray-600'}`}
                        >
                            <Users size={20} />
                            Teams
                        </button>
                        <button
                            onClick={openBoard}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                        >
                            <ExternalLink size={20} />
                            Open Display
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                        >
                            Home
                        </button>
                    </div>
                </div>

                {view === 'editor' ? (
                    <QuestionEditor />
                ) : view === 'teams' ? (
                    <TeamConfig />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h2 className="text-2xl font-bold text-feud-gold mb-4">
                                    Question {currentQuestion.id}
                                </h2>
                                <p className="text-xl mb-6">{currentQuestion.question}</p>

                                <div className="grid grid-cols-1 gap-3">
                                    {currentQuestion.answers.map((answer, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${answer.revealed ? 'bg-green-900 border-green-500' : 'bg-gray-700 border-gray-600'}`}
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <span className="text-2xl font-bold text-feud-gold w-8">{index + 1}</span>
                                                <span className="text-lg font-semibold">{answer.text}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl font-bold text-feud-gold">{answer.points}</span>
                                                <button
                                                    onClick={() => revealAnswer(index)}
                                                    disabled={answer.revealed}
                                                    className={`px-4 py-2 rounded font-semibold transition-colors ${answer.revealed ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                                >
                                                    {answer.revealed ? 'Revealed' : 'Reveal'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Active Team Selector */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-feud-gold mb-4">Active Team</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {teams.map((team) => (
                                        <button
                                            key={team.id}
                                            onClick={() => setActiveTeam(team.id)}
                                            className={`px-4 py-3 rounded-lg font-semibold transition-all ${activeTeamId === team.id ? 'bg-green-600 ring-2 ring-green-400' : 'bg-gray-700 hover:bg-gray-600'}`}
                                        >
                                            {team.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Scores */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-feud-gold mb-4">Scores</h3>
                                <div className="space-y-4">
                                    {teams.map((team) => (
                                        <div key={team.id} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg">{team.name}:</span>
                                                <span className="text-3xl font-bold">{team.score}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                {[1, 2, 3].map((num) => (
                                                    <div
                                                        key={num}
                                                        className={`flex-1 h-8 rounded flex items-center justify-center text-sm font-bold ${team.strikes >= num ? 'bg-red-600' : 'bg-gray-700'}`}
                                                    >
                                                        {team.strikes >= num ? 'X' : num}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Current Bank */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-feud-gold mb-4">Current Bank</h3>
                                <div className="text-center">
                                    <span className="text-5xl font-bold text-feud-gold">{currentBank}</span>
                                </div>
                            </div>

                            {/* Strike Control */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-feud-gold mb-4">Strike Control</h3>
                                <button
                                    onClick={addStrike}
                                    className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-2"
                                >
                                    <AlertCircle size={20} />
                                    Add Strike to {teams.find(t => t.id === activeTeamId)?.name}
                                </button>
                                <button
                                    onClick={() => clearTeamStrikes(activeTeamId)}
                                    className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition-colors text-sm"
                                >
                                    Clear Strikes
                                </button>
                            </div>

                            {/* Award Points */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-feud-gold mb-4">Award Points</h3>
                                <div className="space-y-3">
                                    {teams.map((team, index) => {
                                        const colors = ['#2563eb', '#9333ea', '#16a34a', '#dc2626', '#ca8a04', '#db2777']
                                        const hoverColors = ['#1d4ed8', '#7e22ce', '#15803d', '#b91c1c', '#a16207', '#be185d']
                                        return (
                                            <button
                                                key={team.id}
                                                onClick={() => awardToTeam(team.id)}
                                                disabled={currentBank === 0}
                                                className="w-full px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                                                style={{ backgroundColor: currentBank === 0 ? '#4b5563' : colors[index % 6] }}
                                                onMouseEnter={(e) => currentBank !== 0 && (e.target.style.backgroundColor = hoverColors[index % 6])}
                                                onMouseLeave={(e) => currentBank !== 0 && (e.target.style.backgroundColor = colors[index % 6])}
                                            >
                                                <Trophy size={20} />
                                                Award to {team.name}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Round Controls */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-feud-gold mb-4">Round Controls</h3>
                                <div className="space-y-3">
                                    <button onClick={resetRound} className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                        <RotateCcw size={20} />
                                        Reset Round
                                    </button>
                                    <button onClick={nextQuestion} className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                        <SkipForward size={20} />
                                        Next Question
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('This will clear all progress and reload questions from Excel. Continue?')) {
                                                localStorage.removeItem('family-feud-state')
                                                window.location.reload()
                                            }
                                        }}
                                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <RotateCcw size={20} />
                                        Reload Excel Questions
                                    </button>
                                </div>
                            </div>

                            <AudioManager />

                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-feud-gold mb-4">Keyboard Shortcuts</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">1-8:</span>
                                        <span>Reveal Answer</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">X:</span>
                                        <span>Add Strike</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Space:</span>
                                        <span>Correct Sound</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HostView
