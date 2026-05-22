import { vi } from 'vitest'
import '@testing-library/jest-dom'
import 'vitest-canvas-mock'

// Mock Cesium for tests
vi.mock('cesium', () => ({
  Viewer: vi.fn(),
  Ion: { defaultAccessToken: '' },
  Terrain: { fromWorldTerrain: vi.fn() },
  BingMapsImageryProvider: vi.fn(),
  Cartesian3: { fromDegrees: vi.fn() },
  Math: { toRadians: vi.fn() },
  ScreenSpaceEventHandler: vi.fn(),
  ScreenSpaceEventType: { LEFT_CLICK: 0 },
  Color: { fromCssColorString: vi.fn() },
  defined: vi.fn(),
}))

// Mock Recharts for tests
vi.mock('recharts', () => ({
  LineChart: vi.fn(({ children }) => <div>{children}</div>),
  Line: vi.fn(() => null),
  ResponsiveContainer: vi.fn(({ children }) => <div>{children}</div>),
}))
