import { useEffect } from 'react'
import { useAppStore } from './hooks/useAppStore'
import ErrorBoundary from './components/ErrorBoundary'
import GlobeViewer from './components/globe/GlobeViewer'
import Dashboard from './components/ui/Dashboard'
import NeighborhoodPanel from './components/ui/NeighborhoodPanel'
import { validateEnvironment } from './config/environment'
import './App.css'

function AppContent() {
  const { selectedNeighborhood, setIsLoading } = useAppStore()

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
    <div className="app-container">
      <GlobeViewer />
      <Dashboard />
      {selectedNeighborhood && <NeighborhoodPanel />}
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
