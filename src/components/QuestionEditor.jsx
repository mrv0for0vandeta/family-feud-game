import { useState } from 'react'
import { Plus, Trash2, Save, Upload } from 'lucide-react'
import useGameStore from '../store/gameStore'

function QuestionEditor() {
    const { loadQuestions } = useGameStore()

    const [questions, setQuestions] = useState([
        {
            question: '',
            answers: [
                { text: '', points: '' },
                { text: '', points: '' },
                { text: '', points: '' },
                { text: '', points: '' },
                { text: '', points: '' },
                { text: '', points: '' },
                { text: '', points: '' },
                { text: '', points: '' },
            ]
        }
    ])

    const addQuestion = () => {
        setQuestions([...questions, {
            question: '',
            answers: Array(8).fill(null).map(() => ({ text: '', points: '' }))
        }])
    }

    const removeQuestion = (qIndex) => {
        setQuestions(questions.filter((_, i) => i !== qIndex))
    }

    const updateQuestion = (qIndex, value) => {
        const updated = [...questions]
        updated[qIndex].question = value
        setQuestions(updated)
    }

    const updateAnswer = (qIndex, aIndex, field, value) => {
        const updated = [...questions]
        updated[qIndex].answers[aIndex][field] = value
        setQuestions(updated)
    }

    const handleLoadToGame = () => {
        // Filter out empty questions and validate
        const validQuestions = questions
            .filter(q => q.question.trim() !== '')
            .map((q, idx) => ({
                id: idx + 1,
                question: q.question.trim(),
                answers: q.answers
                    .filter(a => a.text.trim() !== '')
                    .map(a => ({
                        text: a.text.trim(),
                        points: parseInt(a.points) || 0,
                        revealed: false
                    }))
            }))
            .filter(q => q.answers.length > 0)

        if (validQuestions.length === 0) {
            alert('Please add at least one question with answers!')
            return
        }

        loadQuestions(validQuestions)
        alert(`${validQuestions.length} question(s) loaded successfully!`)
    }

    const exportToJSON = () => {
        const validQuestions = questions
            .filter(q => q.question.trim() !== '')
            .map((q, idx) => ({
                id: idx + 1,
                question: q.question.trim(),
                answers: q.answers
                    .filter(a => a.text.trim() !== '')
                    .map(a => ({
                        text: a.text.trim(),
                        points: parseInt(a.points) || 0
                    }))
            }))
            .filter(q => q.answers.length > 0)

        const dataStr = JSON.stringify(validQuestions, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'family-feud-questions.json'
        link.click()
        URL.revokeObjectURL(url)
    }

    const importFromJSON = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result)
                    const formatted = imported.map(q => ({
                        question: q.question || '',
                        answers: [
                            ...(q.answers || []).map(a => ({ text: a.text || '', points: a.points || '' })),
                            ...Array(Math.max(0, 8 - (q.answers?.length || 0))).fill(null).map(() => ({ text: '', points: '' }))
                        ].slice(0, 8)
                    }))
                    setQuestions(formatted)
                    alert('Questions imported successfully!')
                } catch (err) {
                    alert('Error importing JSON: ' + err.message)
                }
            }
            reader.readAsText(file)
        }
    }

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-feud-gold">Question Editor</h2>
                <div className="flex gap-2">
                    <label className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold transition-colors cursor-pointer flex items-center gap-2">
                        <Upload size={20} />
                        Import JSON
                        <input
                            type="file"
                            accept=".json"
                            onChange={importFromJSON}
                            className="hidden"
                        />
                    </label>
                    <button
                        onClick={exportToJSON}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors flex items-center gap-2"
                    >
                        <Save size={20} />
                        Export JSON
                    </button>
                    <button
                        onClick={handleLoadToGame}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition-colors flex items-center gap-2"
                    >
                        <Upload size={20} />
                        Load to Game
                    </button>
                </div>
            </div>

            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-gray-700 rounded-lg p-4 border-2 border-gray-600">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Question {qIndex + 1}
                                </label>
                                <input
                                    type="text"
                                    value={q.question}
                                    onChange={(e) => updateQuestion(qIndex, e.target.value)}
                                    placeholder="Enter your question here..."
                                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border-2 border-gray-600 focus:border-feud-gold focus:outline-none"
                                />
                            </div>
                            <button
                                onClick={() => removeQuestion(qIndex)}
                                className="mt-7 p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                                title="Remove Question"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-semibold text-gray-300 mb-2">Answers</div>
                            <div className="grid grid-cols-1 gap-2">
                                {q.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className="flex items-center gap-2">
                                        <span className="text-feud-gold font-bold w-6">{aIndex + 1}</span>
                                        <input
                                            type="text"
                                            value={answer.text}
                                            onChange={(e) => updateAnswer(qIndex, aIndex, 'text', e.target.value)}
                                            placeholder="Answer text"
                                            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-feud-gold focus:outline-none text-sm"
                                        />
                                        <input
                                            type="number"
                                            value={answer.points}
                                            onChange={(e) => updateAnswer(qIndex, aIndex, 'points', e.target.value)}
                                            placeholder="Points"
                                            className="w-24 px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-feud-gold focus:outline-none text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addQuestion}
                className="mt-4 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
                <Plus size={20} />
                Add Another Question
            </button>
        </div>
    )
}

export default QuestionEditor
