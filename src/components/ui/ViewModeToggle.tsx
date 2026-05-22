import { useAppStore } from '../../hooks/useAppStore'
import { VIEW_MODES } from '../../config/constants'
import './ViewModeToggle.css'

interface ViewModeToggleProps {
  onModeChange?: (mode: 'absolute' | 'velocity') => void
}

/**
 * ViewModeToggle - Reusable toggle component for switching between view modes
 * Integrates with global state but can also notify parent of changes
 */
export default function ViewModeToggle({ onModeChange }: ViewModeToggleProps) {
  const { viewMode, setViewMode } = useAppStore()

  const handleAbsoluteClick = () => {
    setViewMode(VIEW_MODES.ABSOLUTE as 'absolute')
    onModeChange?.(VIEW_MODES.ABSOLUTE as 'absolute')
  }

  const handleVelocityClick = () => {
    setViewMode(VIEW_MODES.VELOCITY as 'velocity')
    onModeChange?.(VIEW_MODES.VELOCITY as 'velocity')
  }

  return (
    <div className="view-mode-toggle" role="group" aria-label="View mode">
      <span className="toggle-label">View Mode:</span>

      <button
        className={`toggle-btn ${viewMode === VIEW_MODES.ABSOLUTE ? 'active' : ''}`}
        onClick={handleAbsoluteClick}
        aria-pressed={viewMode === VIEW_MODES.ABSOLUTE}
      >
        Absolute Score
      </button>

      <button
        className={`toggle-btn ${viewMode === VIEW_MODES.VELOCITY ? 'active' : ''}`}
        onClick={handleVelocityClick}
        aria-pressed={viewMode === VIEW_MODES.VELOCITY}
      >
        Velocity Diff
      </button>
    </div>
  )
}
