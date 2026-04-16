import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './views/LandingPage'
import HostView from './views/HostView'
import BoardView from './views/BoardView'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/host" element={<HostView />} />
                <Route path="/board" element={<BoardView />} />
            </Routes>
        </Router>
    )
}

export default App
