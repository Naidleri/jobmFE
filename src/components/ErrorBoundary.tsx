import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UI error caught by ErrorBoundary:', error, errorInfo)
  }

  reloadPage = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <h1>Something went wrong</h1>
          <p>Halaman tidak dapat ditampilkan. Silakan coba lagi.</p>
          <button type="button" onClick={this.reloadPage}>
            Coba lagi
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
