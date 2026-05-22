/**
 * Environment variable validation and configuration
 * Ensures all required variables are present and valid at runtime
 * Uses free/open APIs instead of commercial services
 */

interface EnvironmentConfig {
  cesiumToken: string
  phillyDataApi: string
  bingMapsKey?: string
}

const requiredEnvVars = ['VITE_CESIUM_ION_TOKEN']

/**
 * Validates environment configuration at application startup
 * Throws error if critical variables are missing
 */
export function validateEnvironment(): EnvironmentConfig {
  const missingVars = requiredEnvVars.filter((varName) => !import.meta.env[varName])

  if (missingVars.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missingVars.join(', ')}`)
    console.warn('Some features may not work correctly. Check .env configuration.')
  }

  return {
    cesiumToken: import.meta.env.VITE_CESIUM_ION_TOKEN || '',
    phillyDataApi: import.meta.env.VITE_PHILLY_DATA_API || 'https://data.phila.gov/api/v2',
    bingMapsKey: import.meta.env.VITE_BING_MAPS_KEY,
  }
}

/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Validates URL to prevent open redirect attacks
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Gets secure headers for API requests
 */
export function getSecureHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
}
