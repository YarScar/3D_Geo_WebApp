/**
 * Application-wide constants and configuration
 */

export const TIMELINE = {
  START_YEAR: 2015,
  END_YEAR: 2024,
  TOTAL_YEARS: 10,
} as const

export const DISPLACEMENT_SCORE = {
  MIN: 0,
  MAX: 100,
  HEIGHT_MIN: 0,
  HEIGHT_MAX: 2500, // meters
} as const

export const COLOR_RAMPS = {
  ABSOLUTE: {
    DEEP_BLUE: '#1a5490',
    LIGHT_BLUE: '#2e7dc5',
    YELLOW: '#f7b801',
    ORANGE: '#ff6b35',
    CRIMSON: '#cc2936',
  },
  VELOCITY: {
    DEEP_BLUE: '#1a5490',
    LIGHT_BLUE: '#4fa3d1',
    GRAY: '#e8e8e8',
    ORANGE: '#ff8c42',
    CRIMSON: '#cc2936',
  },
} as const

export const CAMERA = {
  PHILADELPHIA_LAT: 39.9526,
  PHILADELPHIA_LNG: -75.1652,
  INITIAL_HEIGHT: 40000,
  FLY_DURATION: 1.5,
} as const

export const API_ENDPOINTS = {
  PHILLY_DATA: import.meta.env.VITE_PHILLY_DATA_API || 'https://data.phila.gov/api/v2',
} as const

export const CESIUM_CONFIG = {
  ION_TOKEN: import.meta.env.VITE_CESIUM_ION_TOKEN || '',
  TERRAIN_ENABLED: true,
  ANIMATION_ENABLED: false,
  TIMELINE_ENABLED: false,
} as const

export const QUERY_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  CACHE_TIME: 1000 * 60 * 10, // 10 minutes
  RETRY_DELAY: 1000,
  RETRY_COUNT: 3,
} as const

export const VIEW_MODES = {
  ABSOLUTE: 'absolute',
  VELOCITY: 'velocity',
} as const

export const ANIMATION_DURATION = {
  TRANSITION: 0.15, // seconds
  CAMERA_FLY: 1.5, // seconds
  PANEL_OPEN: 0.3, // seconds
} as const

export const LIMITS = {
  MAX_NEIGHBORHOODS: 1000,
  DETAIL_FETCH_TIMEOUT: 5000, // milliseconds
} as const
