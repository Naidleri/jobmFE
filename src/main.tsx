import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'

function handleUnhandledRejection(event: PromiseRejectionEvent) {
  console.error('Unhandled background/API rejection:', event.reason)
}

window.addEventListener('unhandledrejection', handleUnhandledRejection)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
