/**
 * Global type definitions for the application
 * Centralized type safety across the codebase
 */

/**
 * Neighborhood displacement data for a specific year
 */
export interface NeighborhoodScore {
  [key: `score${number}`]: number
}

/**
 * Neighborhood geospatial data with historical scores
 */
export interface Neighborhood extends NeighborhoodScore {
  name: string
  score2015: number
  score2016: number
  score2017: number
  score2018: number
  score2019: number
  score2020: number
  score2021: number
  score2022: number
  score2023: number
  score2024: number
}

/**
 * Detailed neighborhood information with indicators
 */
export interface NeighborhoodDetail {
  currentScore: number
  changeFromBaseline: number
  medianRentChange: number
  transactionCount: number
  indicators: Indicator[]
}

/**
 * Single indicator metric with historical data
 */
export interface Indicator {
  name: string
  value: number
  sparkline: SparklinePoint[]
}

/**
 * Point in time series data
 */
export interface SparklinePoint {
  year: number
  value: number
}

/**
 * Application view mode
 */
export type ViewMode = 'absolute' | 'velocity'

/**
 * API response wrapper for standardized responses
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    code: string
  }
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

/**
 * Color definition for visualization
 */
export interface ColorDefinition {
  value: number
  color: string
}

/**
 * Cesium camera position
 */
export interface CameraPosition {
  latitude: number
  longitude: number
  height: number
}

/**
 * Application error with context
 */
export interface AppError extends Error {
  code?: string
  context?: Record<string, any>
  recoverable?: boolean
}

/**
 * Loading state representation
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * Generic async operation state
 */
export interface AsyncState<T> {
  status: LoadingState
  data?: T
  error?: AppError
  isLoading: boolean
}
