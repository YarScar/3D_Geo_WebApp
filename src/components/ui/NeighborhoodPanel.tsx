import { useEffect } from 'react'
import { useAppStore } from '../../hooks/useAppStore'
import { useNeighborhoodDetails } from '../../layers/useNeighborhoodDetails'
import IndicatorChart from './IndicatorChart'
import './NeighborhoodPanel.css'

export default function NeighborhoodPanel() {
  const { selectedNeighborhood, setSelectedNeighborhood } = useAppStore()
  const { data: details, isLoading } = useNeighborhoodDetails(selectedNeighborhood || '')

  if (!selectedNeighborhood) return null

  return (
    <div className="neighborhood-panel">
      <div className="panel-header">
        <h2>{selectedNeighborhood}</h2>
        <button 
          className="close-btn"
          onClick={() => setSelectedNeighborhood(null)}
        >
          ✕
        </button>
      </div>

      <div className="panel-content">
        {isLoading ? (
          <div className="loading">Loading neighborhood data...</div>
        ) : details ? (
          <>
            <div className="score-display">
              <div className="score-item">
                <span className="score-label">Current Score</span>
                <span className="score-value">{details.currentScore.toFixed(1)}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Change from 2015</span>
                <span className="score-value score-change">
                  {details.changeFromBaseline > 0 ? '+' : ''}{details.changeFromBaseline.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="indicators">
              <h3>Indicators</h3>
              {details.indicators.map((indicator, idx) => (
                <IndicatorChart 
                  key={idx}
                  name={indicator.name}
                  value={indicator.value}
                  sparkline={indicator.sparkline}
                />
              ))}
            </div>

            <div className="property-info">
              <h3>Recent Activity</h3>
              <p className="info-text">
                Median rent change: {details.medianRentChange > 0 ? '+' : ''}{(details.medianRentChange * 100).toFixed(1)}%
              </p>
              <p className="info-text">
                Property transactions (past year): {details.transactionCount}
              </p>
            </div>
          </>
        ) : (
          <div className="error">Failed to load neighborhood details</div>
        )}
      </div>
    </div>
  )
}
