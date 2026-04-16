import { motion } from 'framer-motion'

function AnswerCard({ answer, index, revealed }) {
    return (
        <div className="relative h-24">
            {revealed ? (
                // Revealed State - Show answer and points
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 border-4 border-white rounded-lg shadow-2xl flex items-center justify-between px-6 relative overflow-hidden"
                >
                    {/* Number badge */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                        <span className="text-blue-600 font-display font-bold text-xl">{index + 1}</span>
                    </div>

                    {/* Answer text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 text-left pl-16"
                    >
                        <span className="text-white font-display font-bold text-2xl uppercase tracking-wide drop-shadow-lg">
                            {answer.text}
                        </span>
                    </motion.div>

                    {/* Points badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="bg-white rounded-sm px-4 py-2 min-w-[60px] text-center"
                    >
                        <span className="text-blue-600 font-display font-bold text-3xl">{answer.points}</span>
                    </motion.div>

                    {/* Shine effect */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        style={{ width: '50%' }}
                    />
                </motion.div>
            ) : (
                // Hidden State - Show number only
                <div className="h-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 border-4 border-white rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-transparent"></div>
                    <div className="relative w-12 h-12 bg-white rounded-sm flex items-center justify-center shadow-lg">
                        <span className="text-blue-600 font-display font-bold text-3xl">{index + 1}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnswerCard
