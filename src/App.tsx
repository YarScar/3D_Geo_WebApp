import { useEffect } from 'react'
import { useAppStore } from './hooks/useAppStore'
import ErrorBoundary from './components/ErrorBoundary'
import GlobeViewer from './components/globe/GlobeViewer'
import Dashboard from './components/ui/Dashboard'
import NeighborhoodPanel from './components/ui/NeighborhoodPanel'
import Loader from './components/ui/Loader'
import { validateEnvironment } from './config/environment'
import './App.css'

function AppContent() {
  const { selectedNeighborhood, setIsLoading, isLoading } = useAppStore()

  useEffect(() => {
    // Validate environment on app startup
    validateEnvironment()

    // Initialize application
    const initializeApp = async () => {
      try {
        setIsLoading(true)
        // Data loading will be handled by the GlobeViewer component
        // This is just a placeholder for any app-level initialization
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [setIsLoading])

  return (
    <div id="app-root">
      <header className="app-header">
        <h1 style={{ fontSize: 16, fontWeight: 700 }}>Philadelphia Neighborhood Change Tracker</h1>
        <div>
          {/* Dashboard controls moved to header for compact layout */}
          <Dashboard />
        </div>
      </header>

      <main className="app-main">
        <aside className="left-panel">
          {/* Placeholder for filters, legend, etc. */}
          <div style={{ marginTop: 12 }}>
            <strong style={{ color: '#ff6b35' }}>Legend</strong>
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 24, height: 12, background: '#1a5490' }} />
                <span style={{ fontSize: 12 }}>Low displacement</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                <div style={{ width: 24, height: 12, background: '#ff6b35' }} />
                <span style={{ fontSize: 12 }}>High displacement</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="viewer-container">
          <GlobeViewer />
          <div className="timeline-footer" />
        </div>

        {selectedNeighborhood && <aside className="right-panel"><NeighborhoodPanel /></aside>}
      </main>
      {isLoading && <Loader />}
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  )
}

export default App
