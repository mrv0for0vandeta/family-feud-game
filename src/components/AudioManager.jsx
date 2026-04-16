import { Volume2, VolumeX, Music } from 'lucide-react'
import { useRef, useEffect } from 'react'

function AudioManager() {
    const correctRef = useRef(null)
    const wrongRef = useRef(null)
    const introRef = useRef(null)

    useEffect(() => {
        // Preload audio files
        if (correctRef.current) correctRef.current.load()
        if (wrongRef.current) wrongRef.current.load()
        if (introRef.current) introRef.current.load()

        // Keyboard shortcut for correct sound (Space)
        const handleKeyPress = (e) => {
            if (e.key === ' ' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
                e.preventDefault()
                playSound('correct')
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [])

    const playSound = (type) => {
        if (type === 'correct' && correctRef.current) {
            correctRef.current.currentTime = 0
            correctRef.current.play().catch(e => console.error('Error playing correct sound:', e))
        }
        if (type === 'wrong' && wrongRef.current) {
            wrongRef.current.currentTime = 0
            wrongRef.current.play().catch(e => console.error('Error playing wrong sound:', e))
        }
        if (type === 'intro' && introRef.current) {
            introRef.current.currentTime = 0
            introRef.current.play().catch(e => console.error('Error playing intro sound:', e))
        }
    }

    const stopSound = (type) => {
        if (type === 'intro' && introRef.current) {
            introRef.current.pause()
            introRef.current.currentTime = 0
        }
    }

    return (
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 mb-4">
                <Music className="text-feud-gold" size={24} />
                <h3 className="text-xl font-bold text-white">Audio Controls</h3>
            </div>

            {/* Preloaded audio elements */}
            <audio ref={correctRef} src="/correct.mp3" preload="auto" />
            <audio ref={wrongRef} src="/wrong.mp3" preload="auto" />
            <audio ref={introRef} src="/intro.mp3" preload="auto" loop />

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="flex-1 text-sm text-gray-300">Correct Answer:</span>
                    <button
                        onClick={() => playSound('correct')}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                        <Volume2 size={20} />
                        Play
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="flex-1 text-sm text-gray-300">Wrong Answer:</span>
                    <button
                        onClick={() => playSound('wrong')}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        <Volume2 size={20} />
                        Play
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="flex-1 text-sm text-gray-300">Theme Song:</span>
                    <button
                        onClick={() => playSound('intro')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Volume2 size={20} />
                        Play
                    </button>
                    <button
                        onClick={() => stopSound('intro')}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        <VolumeX size={20} />
                    </button>
                </div>
            </div>

            <div className="mt-4 p-3 bg-gray-700 rounded text-xs text-gray-300">
                <p className="font-semibold mb-1">Keyboard Shortcuts:</p>
                <p>Space: Play Correct Sound</p>
            </div>
        </div>
    )
}

export default AudioManager
