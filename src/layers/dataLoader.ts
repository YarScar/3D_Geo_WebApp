import { NeighborhoodData } from '../hooks/useAppStore'

// This would normally load from a file or API
// For now, we'll create a mock dataset
const MOCK_NEIGHBORHOODS: NeighborhoodData[] = [
  {
    name: 'Center City',
    score2015: 45,
    score2016: 48,
    score2017: 51,
    score2018: 54,
    score2019: 57,
    score2020: 58,
    score2021: 62,
    score2022: 65,
    score2023: 68,
    score2024: 72,
  },
  {
    name: 'University City',
    score2015: 38,
    score2016: 40,
    score2017: 43,
    score2018: 46,
    score2019: 49,
    score2020: 50,
    score2021: 54,
    score2022: 58,
    score2023: 62,
    score2024: 66,
  },
  {
    name: 'Kensington',
    score2015: 62,
    score2016: 61,
    score2017: 60,
    score2018: 59,
    score2019: 58,
    score2020: 57,
    score2021: 56,
    score2022: 55,
    score2023: 54,
    score2024: 52,
  },
  {
    name: 'Northeast',
    score2015: 35,
    score2016: 36,
    score2017: 37,
    score2018: 38,
    score2019: 39,
    score2020: 40,
    score2021: 41,
    score2022: 42,
    score2023: 43,
    score2024: 44,
  },
  {
    name: 'South Philadelphia',
    score2015: 55,
    score2016: 56,
    score2017: 57,
    score2018: 58,
    score2019: 59,
    score2020: 60,
    score2021: 61,
    score2022: 62,
    score2023: 63,
    score2024: 64,
  },
]

export async function loadNeighborhoodData(): Promise<NeighborhoodData[]> {
  try {
    // In production, this would load from:
    // - /data/philly_neighborhoods_indexed.geojson
    // - Or from an API endpoint
    
    // For now, return mock data with a small delay to simulate loading
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return MOCK_NEIGHBORHOODS
  } catch (error) {
    console.error('Error loading neighborhood data:', error)
    return MOCK_NEIGHBORHOODS
  }
}

export async function loadGeoJSONNeighborhoods() {
  try {
    // Load the actual GeoJSON file
    const response = await fetch('/data/philly_neighborhoods_indexed.geojson')
    if (!response.ok) throw new Error('Failed to load GeoJSON')
    return await response.json()
  } catch (error) {
    console.error('Error loading GeoJSON:', error)
    return null
  }
}
