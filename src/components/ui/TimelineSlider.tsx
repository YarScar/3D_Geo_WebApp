import { useAppStore } from '../../hooks/useAppStore'
import { TIMELINE } from '../../config/constants'
import './TimelineSlider.css'

interface TimelineSliderProps {
  startYear?: number
  endYear?: number
  onYearChange?: (year: number) => void
}

/**
 * TimelineSlider - Reusable range slider component for year selection
 * Can be used standalone or with global state via hooks
 */
export default function TimelineSlider({
  startYear = TIMELINE.START_YEAR,
  endYear = TIMELINE.END_YEAR,
  onYearChange,
}: TimelineSliderProps) {
  const { selectedYear, setSelectedYear } = useAppStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10)
    setSelectedYear(year)
    onYearChange?.(year)
  }

  const progress = ((selectedYear - startYear) / (endYear - startYear)) * 100

  return (
    <div className="timeline-slider">
      <label className="timeline-label">
        <span className="timeline-year">{selectedYear}</span>
      </label>

      <div className="slider-track">
        <div className="slider-progress" style={{ width: `${progress}%` }} />
        <input
          type="range"
          min={startYear}
          max={endYear}
          value={selectedYear}
          onChange={handleChange}
          className="slider-input"
          aria-label="Select year"
        />
      </div>

      <div className="timeline-labels">
        <span className="timeline-start">{startYear}</span>
        <span className="timeline-end">{endYear}</span>
      </div>
    </div>
  )
}
