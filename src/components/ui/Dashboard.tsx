import { useAppStore } from '../../hooks/useAppStore'
import TimelineSlider from './TimelineSlider'
import ViewModeToggle from './ViewModeToggle'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Philadelphia Neighborhood Change Tracker</h1>
      </div>
      
      <div className="dashboard-controls">
        <ViewModeToggle />
      </div>

      <div className="dashboard-footer">
        <TimelineSlider />
      </div>
    </div>
  )
}
