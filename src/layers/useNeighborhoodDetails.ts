import { useQuery } from '@tanstack/react-query'
import { fetchPhiladelphiaRealEstateData } from './freeApis'

export interface NeighborhoodDetails {
  currentScore: number
  changeFromBaseline: number
  medianRentChange: number
  transactionCount: number
  indicators: Array<{
    name: string
    value: number
    sparkline: Array<{ year: number; value: number }>
  }>
}

// Mock data for demonstration (replace with real API calls)
const MOCK_DETAILS: Record<string, NeighborhoodDetails> = {
  'Center City': {
    currentScore: 72,
    changeFromBaseline: 27,
    medianRentChange: 0.35,
    transactionCount: 2847,
    indicators: [
      {
        name: 'Median Rent',
        value: 82,
        sparkline: [
          { year: 2015, value: 45 },
          { year: 2016, value: 48 },
          { year: 2017, value: 51 },
          { year: 2018, value: 54 },
          { year: 2019, value: 57 },
          { year: 2020, value: 58 },
          { year: 2021, value: 62 },
          { year: 2022, value: 65 },
          { year: 2023, value: 68 },
          { year: 2024, value: 72 },
        ],
      },
      {
        name: 'Property Values',
        value: 68,
        sparkline: [
          { year: 2015, value: 40 },
          { year: 2016, value: 43 },
          { year: 2017, value: 46 },
          { year: 2018, value: 49 },
          { year: 2019, value: 52 },
          { year: 2020, value: 54 },
          { year: 2021, value: 58 },
          { year: 2022, value: 62 },
          { year: 2023, value: 65 },
          { year: 2024, value: 68 },
        ],
      },
      {
        name: 'Population Change',
        value: 15,
        sparkline: [
          { year: 2015, value: 50 },
          { year: 2016, value: 49 },
          { year: 2017, value: 48 },
          { year: 2018, value: 48 },
          { year: 2019, value: 47 },
          { year: 2020, value: 47 },
          { year: 2021, value: 46 },
          { year: 2022, value: 45 },
          { year: 2023, value: 44 },
          { year: 2024, value: 43 },
        ],
      },
      {
        name: 'Income Diversity',
        value: 62,
        sparkline: [
          { year: 2015, value: 62 },
          { year: 2016, value: 61 },
          { year: 2017, value: 60 },
          { year: 2018, value: 59 },
          { year: 2019, value: 58 },
          { year: 2020, value: 57 },
          { year: 2021, value: 56 },
          { year: 2022, value: 55 },
          { year: 2023, value: 54 },
          { year: 2024, value: 52 },
        ],
      },
    ],
  },
  'University City': {
    currentScore: 66,
    changeFromBaseline: 28,
    medianRentChange: 0.42,
    transactionCount: 1923,
    indicators: [
      {
        name: 'Median Rent',
        value: 75,
        sparkline: [
          { year: 2015, value: 38 },
          { year: 2016, value: 40 },
          { year: 2017, value: 43 },
          { year: 2018, value: 46 },
          { year: 2019, value: 49 },
          { year: 2020, value: 50 },
          { year: 2021, value: 54 },
          { year: 2022, value: 58 },
          { year: 2023, value: 62 },
          { year: 2024, value: 66 },
        ],
      },
      {
        name: 'Property Values',
        value: 71,
        sparkline: [
          { year: 2015, value: 35 },
          { year: 2016, value: 38 },
          { year: 2017, value: 41 },
          { year: 2018, value: 44 },
          { year: 2019, value: 47 },
          { year: 2020, value: 49 },
          { year: 2021, value: 53 },
          { year: 2022, value: 57 },
          { year: 2023, value: 61 },
          { year: 2024, value: 65 },
        ],
      },
      {
        name: 'Population Change',
        value: 8,
        sparkline: [
          { year: 2015, value: 55 },
          { year: 2016, value: 54 },
          { year: 2017, value: 52 },
          { year: 2018, value: 51 },
          { year: 2019, value: 50 },
          { year: 2020, value: 49 },
          { year: 2021, value: 48 },
          { year: 2022, value: 47 },
          { year: 2023, value: 46 },
          { year: 2024, value: 45 },
        ],
      },
      {
        name: 'Income Diversity',
        value: 58,
        sparkline: [
          { year: 2015, value: 60 },
          { year: 2016, value: 59 },
          { year: 2017, value: 58 },
          { year: 2018, value: 57 },
          { year: 2019, value: 56 },
          { year: 2020, value: 55 },
          { year: 2021, value: 54 },
          { year: 2022, value: 53 },
          { year: 2023, value: 52 },
          { year: 2024, value: 51 },
        ],
      },
    ],
  },
}

/**
 * Fetches neighborhood details using Philadelphia Open Data
 * Source: Philadelphia Open Data API
 */
async function fetchNeighborhoodDetails(
  neighborhood: string
): Promise<NeighborhoodDetails | null> {
  try {
    // For now, return mock data while integrating real Philadelphia Open Data APIs
    // In production, use fetchPhiladelphiaRealEstateData() for transaction history

    await new Promise((resolve) => setTimeout(resolve, 300))

    return (
      MOCK_DETAILS[neighborhood] || {
        currentScore: 50,
        changeFromBaseline: 0,
        medianRentChange: 0.1,
        transactionCount: 0,
        indicators: [],
      }
    )
  } catch (error) {
    console.error('Error fetching neighborhood details:', error)
    return null
  }
}

export function useNeighborhoodDetails(neighborhood: string) {
  return useQuery({
    queryKey: ['neighborhood', neighborhood],
    queryFn: () => fetchNeighborhoodDetails(neighborhood),
    enabled: !!neighborhood,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
