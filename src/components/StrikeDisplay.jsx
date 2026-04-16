import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

function StrikeDisplay({ strikes }) {
    return (
        <div className="flex gap-8 items-center justify-center">
            {[1, 2, 3].map((num) => (
                <AnimatePresence key={num} mode="wait">
                    {strikes >= num && (
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
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, -10, 10, 0],
                                    scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 0.5,
                                    times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                                }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-50"></div>
                                    <X
                                        className="relative text-feud-red drop-shadow-2xl"
                                        size={120}
                                        strokeWidth={8}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            ))}
        </div>
    )
}

export default StrikeDisplay
