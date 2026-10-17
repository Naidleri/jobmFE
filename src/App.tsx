import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { TOAST_EVENT, Toast, type ToastEventDetail } from './components'
import Sidebar from './components/layouts/Sidebar'
import LandingPage from './pages/LandingPage'
import JobDetailPage from './features/jobs/pages/JobDetailPage'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import MyProfilePage from './pages/MyProfilePage'
import CompanyLandingPage from './pages/CompanyLandingPage'
import CompanyCreateJobPage from './pages/CompanyCreateJobPage'
import CompanyApplicantsPage from './pages/CompanyApplicantsPage'
import { useAuth } from './hooks/useAuth'

function HomePage() {
  const { user } = useAuth()
  return user?.role === 'COMPANY' ? <CompanyLandingPage /> : <LandingPage />
}

function App() {
  const [toast, setToast] = useState<ToastEventDetail | null>(null)

  useEffect(() => {
    function handleToast(event: Event) {
      const toastEvent = event as CustomEvent<ToastEventDetail>
      setToast(toastEvent.detail)
    }

    window.addEventListener(TOAST_EVENT, handleToast)

    return () => window.removeEventListener(TOAST_EVENT, handleToast)
  }, [])

  return (
    <div className="flex min-h-full bg-white">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/jobs/create" element={<CompanyCreateJobPage />} />
          <Route path="/company/jobs/:jobId/applicants" element={<CompanyApplicantsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
