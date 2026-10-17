import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/layouts/Sidebar'
import LandingPage from './pages/LandingPage'
import JobDetailPage from './features/jobs/pages/JobDetailPage'

function App() {
  return (
    <div className="flex min-h-full bg-white">
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/profile" element={<h1>My Profile</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
