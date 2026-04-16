# 🎮 Family Feud Game

A modern, local-first Family Feud game with dual-screen support, built with React, Tailwind CSS, and Framer Motion.

![Family Feud](https://img.shields.io/badge/Game-Family%20Feud-orange)
![React](https://img.shields.io/badge/React-18.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### � Dual-Screen Architecture
- **Host View**: Complete control panel for game moderators
- **Display View**: Clean, TV-style interface for participants/projector
- **Real-time Sync**: Instant synchronization between screens using BroadcastChannel API

### � Game Features
- ✅ Classic Family Feud design with oval frame and decorative dots
- ✅ 8-slot answer board with 3D flip card animations
- ✅ Separate strike tracking for each team (0-3 strikes per team)
- ✅ Unlimited teams with custom names
- ✅ Dynamic scoring system
- ✅ Question management with Excel import
- ✅ Audio effects (correct, wrong, theme song)

### 📊 Excel Integration
- Import questions directly from Excel surveys
- Automatic point calculation based on answer frequency
- Most popular answers get highest points
- Includes 11 pre-loaded questions from survey data

### 🎵 Audio System
- Upload custom sound effects
- Automatic playback on reveals and strikes
- Looping theme song support
- Keyboard shortcuts for quick access

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Then open http://localhost:3000

### Choose Your Role

1. **Host** - Control the game from one device
2. **Display** - Show the game board on projector/TV

## 📖 How to Play

### Setup
1. Open the landing page on both devices
2. Click **HOST** on the control device
3. Click **DISPLAY** on the projector/TV device
4. Press **F** on display for fullscreen

### Host Controls
- **1-8 Keys**: Reveal answers
- **X Key**: Add strike to active team
- **Space**: Play correct sound
- Click team buttons to select active team
- Award points to teams
- Manage questions and teams

### Display Controls
- **F Key**: Toggle fullscreen
- **H Key**: Return to home
- Automatically syncs with host actions

## 🎮 Game Flow

1. **Configure Teams**: Set team names and number of teams
2. **Load Questions**: Use Excel import or manual editor
3. **Select Active Team**: Choose which team is playing
4. **Reveal Answers**: Click reveal or press 1-8
5. **Add Strikes**: Press X or click button (goes to active team)
6. **Award Points**: Give points to winning team
7. **Next Question**: Move to next round

## 📊 Excel Question Format

Create questions in Excel with this structure:

```
| Question Column                          | Answer 1 | Answer 2 | ... |
|------------------------------------------|----------|----------|-----|
| What is the best place to nap on campus? | Library  | Dorm     | ... |
```

Then run:
```bash
npm run process-excel
```

Points are automatically calculated based on answer frequency!

## 🎨 Customization

### Team Configuration
- Add unlimited teams
- Rename teams
- Each team tracks own strikes
- Custom colors per team

### Question Editor
- Built-in table editor
- Import/Export JSON
- Real-time preview

### Audio Files
- Upload custom sounds
- Supports MP3 format
- Auto-play on game events

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Navigation
- **XLSX** - Excel processing
- **Lucide React** - Icons

## 📁 Project Structure

```
family-feud-game/
├── public/              # Audio files
├── src/
│   ├── components/      # Reusable components
│   │   ├── AnswerCard.jsx
│   │   ├── AudioManager.jsx
│   │   ├── QuestionEditor.jsx
│   │   ├── ScoreBoard.jsx
│   │   ├── StrikeDisplay.jsx
│   │   └── TeamConfig.jsx
│   ├── data/           # Questions JSON
│   ├── store/          # Zustand state
│   ├── views/          # Page components
│   │   ├── LandingPage.jsx
│   │   ├── HostView.jsx
│   │   └── BoardView.jsx
│   └── App.jsx
├── scripts/            # Excel processor
└── package.json
```

## 🎯 Key Features Explained

### Separate Strike Tracking
Each team has their own strike counter (0-3). When a team reaches 3 strikes:
- Giant X overlay appears for that team
- Auto-clears after 3 seconds
- Awarding points clears that team's strikes

### Real-time Sync
- Uses BroadcastChannel API for instant updates
- Falls back to localStorage events
- Works across different devices on same network
- No server required!

### Excel Integration
- Reads survey responses
- Counts answer frequencies
- Assigns points proportionally
- Filters out invalid responses

## 🔧 Configuration

### Update Questions from Excel
```bash
npm run process-excel
```

### Clear Cache and Reload
Click "Reload Excel Questions" button in Host View

## 📝 License

MIT License - feel free to use for your events!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 👨‍💻 Author

Created for UM6P QPUC Family Feud event

## 🎉 Acknowledgments

- Survey responses from UM6P students
- Classic Family Feud TV show for inspiration
- React and Framer Motion communities

---

**Enjoy your Family Feud game! 🎮✨**
