import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store/gameStore'
import { X } from 'lucide-react'

function ScoreBoard() {
    const { teams } = useGameStore()

    return (
        <div className="flex items-center justify-center w-full gap-8">
            {teams.map((team, index) => (
                <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-1 max-w-md"
                >
                    <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 border-4 border-orange-500 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

                        <div className="relative text-center">
                            {/* Team Name */}
                            <motion.div
                                className="text-3xl font-display text-orange-400 mb-4 uppercase tracking-wider truncate"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {team.name}
                            </motion.div>

                            {/* Score */}
                            <motion.div
                                className="text-7xl font-display font-bold text-white mb-6 drop-shadow-lg"
                                key={team.score}
                                initial={{ scale: 1.5, color: "#fb923c" }}
                                animate={{ scale: 1, color: "#ffffff" }}
                                transition={{ duration: 0.4, type: "spring" }}
                            >
                                {team.score}
                            </motion.div>

                            {/* Strikes */}
                            <div className="flex justify-center gap-3">
                                {[1, 2, 3].map((num) => (
                                    <AnimatePresence key={num} mode="wait">
                                        {team.strikes >= num ? (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{
                                                    scale: 1,
                                                    rotate: 0,
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 260,
                                                        damping: 20
                                                    }
                                                }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                className="relative"
                                            >
                                                <div className="absolute inset-0 bg-red-600 rounded-full blur-lg opacity-50"></div>
                                                <div className="relative bg-red-600 rounded-full p-3 shadow-xl">
                                                    <X className="text-white" size={32} strokeWidth={4} />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="bg-gray-700 rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-inner"
                                            >
                                                <span className="text-gray-500 font-bold text-xl">{num}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3 Strikes Overlay for this team */}
                    <AnimatePresence>
                        {team.strikes === 3 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute inset-0 flex items-center justify-center z-50"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [-5, 5, -5, 5, 0],
                                        scale: [1, 1.1, 1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatDelay: 0.3
                                    }}
                                    className="text-red-600"
                                >
                                    <svg width="300" height="300" viewBox="0 0 200 200">
                                        <line x1="30" y1="30" x2="170" y2="170" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
                                        <line x1="170" y1="30" x2="30" y2="170" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    )
}

export default ScoreBoard
