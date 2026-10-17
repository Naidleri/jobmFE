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
        <main className="grid min-h-full place-content-center justify-items-center p-8 text-center text-[#15213f]">
          <h1>Something went wrong</h1>
          <p className="text-[#66718a]">Halaman tidak dapat ditampilkan. Silakan coba lagi.</p>
          <button className="min-h-[42px] rounded-[10px] bg-[#101c40] px-[18px] font-semibold text-white" type="button" onClick={this.reloadPage}>
            Coba lagi
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
