import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Monitor, Gamepad2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

function LandingPage() {
    const navigate = useNavigate()
    const [showParticipantInput, setShowParticipantInput] = useState(false)
    const [partyCode, setPartyCode] = useState('')
    const [error, setError] = useState('')

    const handleHostClick = () => {
        // Generate a random 6-character party code
        const code = Math.random().toString(36).substring(2, 8).toUpperCase()
        localStorage.setItem('partyCode', code)
        localStorage.setItem('isHost', 'true')
        navigate('/host')
    }

    const handleParticipantClick = () => {
        setShowParticipantInput(true)
    }

    const handleJoinParty = () => {
        const code = partyCode.trim().toUpperCase()
        if (!code) {
            setError('Please enter a party code')
            return
        }
        if (code.length !== 6) {
            setError('Party code must be 6 characters')
            return
        }

        localStorage.setItem('partyCode', code)
        localStorage.setItem('isHost', 'false')
        navigate('/board')
    }

    if (showParticipantInput) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, #fbbf24 2px, transparent 2px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 max-w-md w-full"
                >
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-orange-400 rounded-3xl p-12 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="mb-6 flex justify-center">
                                <div className="bg-orange-400 rounded-full p-8">
                                    <Monitor size={80} className="text-blue-800" strokeWidth={2.5} />
                                </div>
                            </div>
                            <h2 className="text-4xl font-display font-bold text-white mb-4">
                                JOIN PARTY
                            </h2>
                            <p className="text-xl text-blue-100 mb-6">
                                Enter the party code from the host
                            </p>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={partyCode}
                                onChange={(e) => {
                                    setPartyCode(e.target.value.toUpperCase())
                                    setError('')
                                }}
                                placeholder="ENTER CODE"
                                maxLength={6}
                                className="w-full px-6 py-4 text-center text-3xl font-bold bg-white/10 border-2 border-orange-400 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 uppercase tracking-widest"
                            />

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-300 text-center font-semibold"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                onClick={handleJoinParty}
                                className="w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Join Game
                                <ArrowRight size={24} />
                            </button>

                            <button
                                onClick={() => {
                                    setShowParticipantInput(false)
                                    setPartyCode('')
                                    setError('')
                                }}
                                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #fbbf24 2px, transparent 2px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-7xl font-display font-bold text-feud-gold mb-4 drop-shadow-2xl">
                        FAMILY FEUD
                    </h1>
                    <p className="text-2xl text-white opacity-90">
                        Choose your role to begin
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleHostClick}
                        className="cursor-pointer"
                    >
                        <div className="bg-gradient-to-br from-orange-600 to-orange-800 border-4 border-yellow-400 rounded-3xl p-12 shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300">
                            <div className="text-center">
                                <div className="mb-6 flex justify-center">
                                    <div className="bg-yellow-400 rounded-full p-8">
                                        <Gamepad2 size={80} className="text-orange-800" strokeWidth={2.5} />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-display font-bold text-white mb-4">
                                    HOST
                                </h2>
                                <p className="text-xl text-yellow-100 mb-6">
                                    Start a new game and get a party code
                                </p>
                                <div className="bg-yellow-400/20 rounded-lg p-4 text-left">
                                    <p className="text-white font-semibold mb-2">Features:</p>
                                    <ul className="text-yellow-100 space-y-1 text-sm">
                                        <li>• Generate party code</li>
                                        <li>• Full game control</li>
                                        <li>• Team management</li>
                                        <li>• Question editor</li>
                                        <li>• Strike control</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleParticipantClick}
                        className="cursor-pointer"
                    >
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-orange-400 rounded-3xl p-12 shadow-2xl hover:shadow-orange-400/50 transition-all duration-300">
                            <div className="text-center">
                                <div className="mb-6 flex justify-center">
                                    <div className="bg-orange-400 rounded-full p-8">
                                        <Monitor size={80} className="text-blue-800" strokeWidth={2.5} />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-display font-bold text-white mb-4">
                                    DISPLAY
                                </h2>
                                <p className="text-xl text-blue-100 mb-6">
                                    Join with party code to show the game board
                                </p>
                                <div className="bg-orange-400/20 rounded-lg p-4 text-left">
                                    <p className="text-white font-semibold mb-2">Features:</p>
                                    <ul className="text-blue-100 space-y-1 text-sm">
                                        <li>• Join with code</li>
                                        <li>• Full-screen board</li>
                                        <li>• Live updates</li>
                                        <li>• Animated reveals</li>
                                        <li>• TV-style design</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <h3 className="text-2xl font-bold text-feud-gold mb-4">How to Play</h3>
                        <div className="grid md:grid-cols-3 gap-6 text-white">
                            <div>
                                <div className="text-4xl mb-2">1️⃣</div>
                                <p className="font-semibold mb-1">Host creates party</p>
                                <p className="text-sm text-gray-300">Get a 6-character party code</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">2️⃣</div>
                                <p className="font-semibold mb-1">Display joins with code</p>
                                <p className="text-sm text-gray-300">Enter code to connect</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">3️⃣</div>
                                <p className="font-semibold mb-1">They sync automatically!</p>
                                <p className="text-sm text-gray-300">Control from host, display updates</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default LandingPage
