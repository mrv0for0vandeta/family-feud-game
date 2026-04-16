import { useNavigate } from 'react-router-dom'
import { Monitor, Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'

function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950 flex items-center justify-center p-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #fbbf24 2px, transparent 2px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                {/* Title */}
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

                {/* Role Selection Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Host Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/host')}
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
                                    Control the game, manage teams, reveal answers, and track scores
                                </p>
                                <div className="bg-yellow-400/20 rounded-lg p-4 text-left">
                                    <p className="text-white font-semibold mb-2">Features:</p>
                                    <ul className="text-yellow-100 space-y-1 text-sm">
                                        <li>• Full game control</li>
                                        <li>• Team management</li>
                                        <li>• Question editor</li>
                                        <li>• Strike control</li>
                                        <li>• Audio controls</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Participant Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/board')}
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
                                    Show the game board to participants and audience on a projector or TV
                                </p>
                                <div className="bg-orange-400/20 rounded-lg p-4 text-left">
                                    <p className="text-white font-semibold mb-2">Features:</p>
                                    <ul className="text-blue-100 space-y-1 text-sm">
                                        <li>• Full-screen game board</li>
                                        <li>• Live score updates</li>
                                        <li>• Animated reveals</li>
                                        <li>• Strike displays</li>
                                        <li>• TV-style design</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Instructions */}
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
                                <p className="font-semibold mb-1">Open Host on one device</p>
                                <p className="text-sm text-gray-300">Control panel for the game master</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">2️⃣</div>
                                <p className="font-semibold mb-1">Open Display on another</p>
                                <p className="text-sm text-gray-300">Connect to projector or TV</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">3️⃣</div>
                                <p className="font-semibold mb-1">They sync automatically!</p>
                                <p className="text-sm text-gray-300">Control from host, display updates live</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default LandingPage
