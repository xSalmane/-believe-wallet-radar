"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error | null
  errorInfo?: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#003B20] to-[#002010] p-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Une erreur s'est produite</h2>
          <p className="mb-6 text-gray-300">Nous rencontrons un problème lors du chargement de l'application.</p>
          {this.state.error && (
            <div className="mb-4 rounded bg-red-900/50 p-4 text-left text-sm text-red-200 max-w-xl overflow-x-auto">
              <div className="font-mono font-bold">{this.state.error.message}</div>
              {this.state.errorInfo && (
                <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-red-300">{this.state.errorInfo.componentStack}</pre>
              )}
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Réessayer
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
