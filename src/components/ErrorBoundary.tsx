import React, { ReactNode } from 'react'
import './ErrorBoundary.css'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

/**
 * Error boundary component to catch and display errors gracefully
 * Production-ready error handling for React components
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error)
    console.error('Error info:', errorInfo)
    // Could send to error tracking service here (e.g., Sentry)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-boundary">
            <div className="error-content">
              <h2>⚠️ Something went wrong</h2>
              <p>The application encountered an error. Please refresh the page to try again.</p>
              <button onClick={() => window.location.reload()}>Refresh Page</button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                  <summary>Error Details</summary>
                  <p>{this.state.error.toString()}</p>
                </details>
              )}
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
