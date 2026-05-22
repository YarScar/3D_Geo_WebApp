import { LineChart, Line, ResponsiveContainer } from 'recharts'
import './IndicatorChart.css'

export interface SparklineDataPoint {
  year: number
  value: number
}

export interface IndicatorChartProps {
  name: string
  value: number
  sparkline: SparklineDataPoint[]
  color?: string
  precision?: number
}

/**
 * IndicatorChart - Reusable sparkline chart component
 * Displays a single indicator with historical trend data
 */
export default function IndicatorChart({
  name,
  value,
  sparkline,
  color = '#ff6b35',
  precision = 1,
}: IndicatorChartProps) {
  // Validate input
  if (!sparkline || sparkline.length === 0) {
    return (
      <div className="indicator-item indicator-empty">
        <div className="indicator-header">
          <span className="indicator-name">{name}</span>
          <span className="indicator-value">N/A</span>
        </div>
      </div>
    )
  }

  return (
    <div className="indicator-item">
      <div className="indicator-header">
        <span className="indicator-name">{name}</span>
        <span className="indicator-value">{value.toFixed(precision)}</span>
      </div>
      <div className="indicator-chart">
        <ResponsiveContainer width="100%" height={40}>
          <LineChart data={sparkline}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
