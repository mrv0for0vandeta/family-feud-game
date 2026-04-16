# Family Feud Game

A local-first, dual-screen Family Feud game built with React, Tailwind CSS, and Framer Motion.

## Features

### 🎮 Dual-Screen Architecture
- **Host View** (`/host`): Complete control panel for the game moderator
- **Display View** (`/board`): Clean, TV-style interface for audience/projector
- **Real-time Sync**: Uses BroadcastChannel API for instant synchronization between tabs

### 🎯 Game Features
- 8-slot answer board with 3D flip card animations
- Strike system with animated red X overlays
- Team scoring with current bank system
- Question management with JSON import
- Keyboard shortcuts for quick control

### 🎨 Visual Design
- 16:9 optimized layout
- TV-style aesthetic with gradient backgrounds
- Gold borders and high-contrast typography
- Smooth Framer Motion animations
- Fullscreen support for Display View

### 🎵 Audio System
- Upload custom sound effects (correct, wrong, intro theme)
- Play sounds via buttons or keyboard shortcuts
- Looping intro theme with stop control

## Installation

```bash
npm install
```

## Running the Game

```bash
npm run dev
```

Then open:
- **Host Control**: http://localhost:3000/host
- **Display Board**: http://localhost:3000/board (or click "Open Display Board" button)

## Usage

### Host View Controls

**Keyboard Shortcuts:**
- `1-8`: Reveal corresponding answer
- `X`: Add a strike
- `Space`: Play correct sound

**Buttons:**
- Individual "Reveal" buttons for each answer
- "Add Strike" button
- "Award to Team 1/2" buttons
- "Reset Round" - Clear all reveals and strikes
- "Next Question" - Move to next question

### Loading Custom Questions

Paste JSON in the "Load Questions" text area:

```json
[
  {
    "id": 1,
    "question": "Name something you find in a kitchen",
    "answers": [
      { "text": "Refrigerator", "points": 38 },
      { "text": "Stove", "points": 26 },
      { "text": "Sink", "points": 15 },
      { "text": "Microwave", "points": 10 },
      { "text": "Dishes", "points": 6 },
      { "text": "Utensils", "points": 3 },
      { "text": "Food", "points": 2 },
      { "text": "Trash Can", "points": 1 }
    ]
  }
]
```

### Display View

- Press `F` to toggle fullscreen
- Automatically syncs with Host View actions
- Shows animated answer reveals
- Displays strikes with shake animations
- Shows giant X overlay when 3 strikes are reached

## Technical Details

### State Management
- **Zustand** for global state management
- **localStorage** for state persistence
- **BroadcastChannel API** for cross-tab synchronization

### Animations
- **Framer Motion** for 3D flip cards
- Spring animations for strikes
- Smooth transitions for score updates

### Styling
- **Tailwind CSS** for utility-first styling
- Custom color palette (feud-blue, feud-gold, feud-red)
- Responsive design with mobile support

## Project Structure

```
src/
├── components/
│   ├── AnswerCard.jsx       # 3D flip card component
│   ├── AudioManager.jsx     # Sound effect controls
│   ├── ScoreBoard.jsx       # Team scores display
│   └── StrikeDisplay.jsx    # Animated strike indicators
├── store/
│   └── gameStore.js         # Zustand state management
├── views/
│   ├── HostView.jsx         # Control panel
│   └── BoardView.jsx        # Display board
├── App.jsx                  # Router setup
└── main.jsx                 # Entry point
```

## Build for Production

```bash
npm run build
npm run preview
```

## Browser Compatibility

- Modern browsers with BroadcastChannel API support
- Chrome, Firefox, Edge (latest versions)
- Safari 15.4+

## Tips

1. Open Host View first, then open Display View in a new window
2. Drag Display View to your projector/second screen
3. Press F on Display View for fullscreen
4. Use keyboard shortcuts on Host View for quick gameplay
5. Upload audio files before starting the game

## License

MIT
