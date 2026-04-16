import { useEffect } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'
import AnswerCard from '../components/AnswerCard'
import ScoreBoard from '../components/ScoreBoard'

function BoardView() {
    const {
        getCurrentQuestion,
        reconnectParty
    } = useGameStore()

    const currentQuestion = getCurrentQuestion()

    // Reconnect to party when component mounts
    useEffect(() => {
        reconnectParty()
    }, [reconnectParty])

    useEffect(() => {
        const handleFullscreen = (e) => {
            if (e.key === 'f' || e.key === 'F') {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen()
                } else {
                    document.exitFullscreen()
                }
            }
        }

        const handleHome = (e) => {
            if (e.key === 'h' || e.key === 'H') {
                if (confirm('Return to home page?')) {
                    window.location.href = '/'
                }
            }
        }

        window.addEventListener('keydown', handleFullscreen)
        window.addEventListener('keydown', handleHome)
        return () => {
            window.removeEventListener('keydown', handleFullscreen)
            window.removeEventListener('keydown', handleHome)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 flex flex-col items-center justify-center overflow-hidden relative p-8">
            {/* Decorative dots background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #f97316 2px, transparent 2px)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl space-y-8">
                {/* Score Board */}
                <ScoreBoard />

                {/* Main Game Board Container */}
                <div className="relative">
                    {/* Oval Frame with Dots */}
                    <div className="relative bg-gradient-to-br from-blue-900 to-blue-950 rounded-[50%] p-12 border-8 border-orange-500 shadow-2xl">
                        {/* Inner dotted border */}
                        <div className="absolute inset-4 rounded-[50%] border-8 border-dashed border-orange-500 opacity-60"></div>

                        {/* Decorative dots around the border */}
                        <div className="absolute inset-0 rounded-[50%]" style={{
                            background: 'radial-gradient(circle at 50% 0%, #f97316 3px, transparent 3px), radial-gradient(circle at 100% 50%, #f97316 3px, transparent 3px), radial-gradient(circle at 50% 100%, #f97316 3px, transparent 3px), radial-gradient(circle at 0% 50%, #f97316 3px, transparent 3px)',
                            backgroundSize: '30px 30px',
                            backgroundRepeat: 'repeat-x, repeat-y, repeat-x, repeat-y',
                            backgroundPosition: 'top, right, bottom, left'
                        }}></div>

                        <div className="relative z-10 space-y-8">
                            {/* Question Header */}
                            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-4 border-orange-500 rounded-2xl py-6 px-8 shadow-xl">
                                <motion.h1
                                    key={currentQuestion.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-4xl md:text-5xl font-display font-bold text-center text-white uppercase tracking-wider drop-shadow-lg"
                                >
                                    {currentQuestion.question}
                                </motion.h1>
                            </div>

                            {/* Answer Grid */}
                            <div className="grid grid-cols-2 gap-4 px-8">
                                {currentQuestion.answers.slice(0, 8).map((answer, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <AnswerCard
                                            answer={answer}
                                            index={index}
                                            revealed={answer.revealed}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls hint */}
            <div className="absolute bottom-4 right-4 text-white text-sm opacity-50 z-20 text-right">
                <div>Press F for fullscreen</div>
                <div>Press H for home</div>
            </div>
        </div>
    )
}

export default BoardView
