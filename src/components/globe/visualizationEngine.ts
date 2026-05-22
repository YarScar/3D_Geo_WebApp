import * as Cesium from 'cesium'
import { NeighborhoodData } from '../../hooks/useAppStore'

const COLOR_RAMP_ABSOLUTE = [
  { value: 0, color: Cesium.Color.fromCssColorString('#1a5490') },     // Deep blue
  { value: 25, color: Cesium.Color.fromCssColorString('#2e7dc5') },    // Blue
  { value: 50, color: Cesium.Color.fromCssColorString('#f7b801') },    // Yellow
  { value: 75, color: Cesium.Color.fromCssColorString('#ff6b35') },    // Orange
  { value: 100, color: Cesium.Color.fromCssColorString('#cc2936') },   // Deep red/crimson
]

const COLOR_RAMP_VELOCITY = [
  { value: -100, color: Cesium.Color.fromCssColorString('#1a5490') },  // Deep blue (stabilizing)
  { value: -50, color: Cesium.Color.fromCssColorString('#4fa3d1') },   // Light blue
  { value: 0, color: Cesium.Color.fromCssColorString('#e8e8e8') },     // Gray (neutral)
  { value: 50, color: Cesium.Color.fromCssColorString('#ff8c42') },    // Orange
  { value: 100, color: Cesium.Color.fromCssColorString('#cc2936') },   // Vibrant crimson
]

export function interpolateColor(value: number, ramp: typeof COLOR_RAMP_ABSOLUTE): Cesium.Color {
  let lower = ramp[0]
  let upper = ramp[ramp.length - 1]

  for (let i = 0; i < ramp.length - 1; i++) {
    if (value >= ramp[i].value && value <= ramp[i + 1].value) {
      lower = ramp[i]
      upper = ramp[i + 1]
      break
    }
  }

  // Linear interpolation between colors
  const range = upper.value - lower.value
  const t = range === 0 ? 0 : (value - lower.value) / range

  // Manually interpolate RGBA channels to avoid relying on non-portable Cesium helpers
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const r = lerp(lower.color.red, upper.color.red, t)
  const g = lerp(lower.color.green, upper.color.green, t)
  const b = lerp(lower.color.blue, upper.color.blue, t)
  const a = lerp(lower.color.alpha ?? 1, upper.color.alpha ?? 1, t)

  return new Cesium.Color(r, g, b, a)
}

function getScoreForYear(neighborhood: NeighborhoodData, year: number): number {
  const key = `score${year}`
  return (neighborhood[key] as number) || 0
}

export function createDisplacementVisualization(
  neighborhoods: NeighborhoodData[],
  year: number,
  viewMode: 'absolute' | 'velocity'
): Cesium.Primitive | null {
  try {
    const instances: Cesium.GeometryInstance[] = []

    neighborhoods.forEach((neighborhood) => {
      const currentScore = getScoreForYear(neighborhood, year)
      const baselineScore = getScoreForYear(neighborhood, 2015)
      
      // Determine the value for coloring
      const colorValue = viewMode === 'velocity' 
        ? currentScore - baselineScore 
        : currentScore

      // Determine height (in meters, scaled 0-2500)
      const height = (currentScore / 100) * 2500

      // Select color ramp based on view mode
      const colorRamp = viewMode === 'velocity' ? COLOR_RAMP_VELOCITY : COLOR_RAMP_ABSOLUTE
      const color = interpolateColor(colorValue, colorRamp)

      // Create a simple box geometry for now
      // In a real implementation, this would use actual neighborhood polygons
      const geometry = Cesium.BoxGraphics.ConstructorOptions ? 
        new Cesium.BoxGeometry({
          minimumHeightInMeters: 0,
          maximumHeightInMeters: height,
        }) : 
        null

      if (geometry) {
        instances.push(
          new Cesium.GeometryInstance({
            geometry: geometry,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
            },
            id: {
              name: neighborhood.name,
              score: colorValue,
            },
          })
        )
      }
    })

    if (instances.length === 0) return null

    return new Cesium.Primitive({
      geometryInstances: instances,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: false,
        translucent: false,
      }),
    })
  } catch (error) {
    console.error('Error creating visualization:', error)
    return null
  }
}
