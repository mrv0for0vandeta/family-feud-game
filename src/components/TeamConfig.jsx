import { useState } from 'react'
import { Users, Plus, Trash2, Save } from 'lucide-react'
import useGameStore from '../store/gameStore'

function TeamConfig() {
    const { teams, updateTeams } = useGameStore()
    const [localTeams, setLocalTeams] = useState(teams)

    const addTeam = () => {
        const newId = Math.max(...localTeams.map(t => t.id), 0) + 1
        setLocalTeams([...localTeams, { id: newId, name: `Team ${newId}`, score: 0 }])
    }

    const removeTeam = (id) => {
        if (localTeams.length <= 2) {
            alert('You must have at least 2 teams!')
            return
        }
        setLocalTeams(localTeams.filter(t => t.id !== id))
    }

    const updateTeamName = (id, name) => {
        setLocalTeams(localTeams.map(t => t.id === id ? { ...t, name } : t))
    }

    const saveTeams = () => {
        updateTeams(localTeams)
        alert('Teams updated successfully!')
    }

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Users className="text-feud-gold" size={24} />
                    <h2 className="text-2xl font-bold text-feud-gold">Team Configuration</h2>
                </div>
                <button
                    onClick={saveTeams}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition-colors flex items-center gap-2"
                >
                    <Save size={20} />
                    Save Teams
                </button>
            </div>

            <div className="space-y-4 mb-6">
                {localTeams.map((team, index) => (
                    <div key={team.id} className="flex items-center gap-4 bg-gray-700 p-4 rounded-lg">
                        <span className="text-2xl font-bold text-feud-gold w-8">{index + 1}</span>
                        <input
                            type="text"
                            value={team.name}
                            onChange={(e) => updateTeamName(team.id, e.target.value)}
                            placeholder="Team Name"
                            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded border-2 border-gray-600 focus:border-feud-gold focus:outline-none"
                        />
                        <div className="text-gray-400 text-sm min-w-[80px]">
                            Score: {team.score}
                        </div>
                        <button
                            onClick={() => removeTeam(team.id)}
                            disabled={localTeams.length <= 2}
                            className="p-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
                            title="Remove Team"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addTeam}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
                <Plus size={20} />
                Add Team
            </button>

            <div className="mt-4 p-3 bg-gray-700 rounded text-xs text-gray-300">
                <p className="font-semibold mb-1">Note:</p>
                <p>• You must have at least 2 teams</p>
                <p>• Team scores will be preserved when you update names</p>
                <p>• Click "Save Teams" to apply changes to the game</p>
            </div>
        </div>
    )
}

export default TeamConfig
