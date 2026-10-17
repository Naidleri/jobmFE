import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/layouts/Sidebar'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<h1>My Profile</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
