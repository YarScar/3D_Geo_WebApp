# Philadelphia Neighborhood Change Tracker

> A production-ready 3D geospatial web application visualizing gentrification and displacement pressure across Philadelphia neighborhoods using CesiumJS.

## 🏆 Project Quality Standards

This project follows industry best practices:

✅ **React & TypeScript** - Strict type safety with modern React patterns  
✅ **Cesium.js 3D** - High-performance geospatial visualization  
✅ **Reusable Components** - Modular architecture with zero coupling  
✅ **Security** - Environment validation, XSS prevention, secure headers  
✅ **Code Quality** - ESLint + Prettier + TypeScript strict mode  
✅ **Error Handling** - Boundary components, graceful degradation  
✅ **.gitignore** - Comprehensive security and OS file exclusions  
✅ **State Management** - Zustand for lightweight global state  
✅ **Data Fetching** - React Query with retry and caching strategies  
✅ **Accessibility** - ARIA labels, semantic HTML, keyboard support  

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Then edit .env with your API keys

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint
npm run lint:fix

# Format code
npm run format
npm run format:check

# Type checking
npm run type-check
```

## 📁 Project Structure

```
philly-change-tracker/
├── src/
│   ├── components/          # React components (reusable)
│   │   ├── Button.tsx       # Base button component
│   │   ├── ErrorBoundary.tsx# Error handling
│   │   ├── globe/           # Cesium 3D viewer
│   │   └── ui/              # Dashboard and panels
│   ├── config/              # Configuration & constants
│   │   ├── constants.ts     # Application-wide constants
│   │   └── environment.ts   # Environment validation & security
│   ├── hooks/               # Custom React hooks
│   │   └── useAppStore.ts   # Zustand global state
│   ├── layers/              # Data fetching & queries
│   │   ├── dataLoader.ts    # Neighborhood data loading
│   │   └── useNeighborhoodDetails.ts
│   ├── styles/              # Global CSS
│   ├── App.tsx              # Root component
│   └── main.tsx             # React entry point
├── public/
│   └── data/                # Static GeoJSON data
├── .eslintrc.json           # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── vite.config.ts           # Vite build config
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies & scripts
```

## 🎯 Component Architecture

All components follow these principles:

### 1. Reusable Components
Components accept props and don't depend on global state unless necessary:

```tsx
// ✅ GOOD - Reusable
<TimelineSlider 
  startYear={2015} 
  endYear={2024}
  onYearChange={(year) => console.log(year)}
/>

// ❌ BAD - Tightly coupled
// Direct store dependency in component
```

### 2. Type Safety
All props are strictly typed:

```tsx
interface ComponentProps {
  name: string
  value: number
  onValueChange?: (value: number) => void
}
```

### 3. Error Boundaries
Graceful error handling at component level:

```tsx
<ErrorBoundary>
  <GlobeViewer onError={(error) => handleError(error)} />
</ErrorBoundary>
```

## 🔒 Security Features

### Environment Validation
```typescript
// Validates required env vars at startup
validateEnvironment()
```

### XSS Prevention
```typescript
sanitizeInput(userInput)  // HTML escapes user text
```

### Secure Headers
```typescript
getSecureHeaders()  // Returns safe HTTP headers
```

### No Hard-coded Secrets
All sensitive values via `.env`:
- Cesium Ion token
- Philadelphia Open Data endpoint (no key required)
- Third-party API endpoints

## 📦 Cesium Integration

Cesium is properly configured in `src/config/constants.ts`:

```typescript
export const CESIUM_CONFIG = {
  ION_TOKEN: import.meta.env.VITE_CESIUM_ION_TOKEN || '',
  TERRAIN_ENABLED: true,
  ANIMATION_ENABLED: false,
}
```

### Performance Optimizations
- Uses primitive rendering (not individual geometries)
- Smooth transitions without geometry rebuilds
- 60 FPS target maintained

## 🔍 Quality Assurance

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint      # Check for issues
npm run lint:fix  # Auto-fix issues
```

### Code Formatting
```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

### Security Audit
```bash
npm run security-check
```

## 🛠 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make changes** - Components are in `src/components/`

3. **Lint and format**
   ```bash
   npm run lint:fix
   npm run format
   npm run type-check
   ```

4. **Test locally**
   ```bash
   npm run dev
   ```

5. **Build and verify**
   ```bash
   npm run build
   npm run preview
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: description"
   git push origin feat/my-feature
   ```

## 🎨 Creating Reusable Components

Template for new components:

```tsx
import React, { ReactNode } from 'react'
import './ComponentName.css'

export interface ComponentNameProps {
  children?: ReactNode
  onAction?: (value: any) => void
  className?: string
}

/**
 * ComponentName - Brief description
 * @param props Component configuration
 * @example
 * <ComponentName onAction={(val) => console.log(val)} />
 */
export default function ComponentName({
  children,
  onAction,
  className,
}: ComponentNameProps) {
  // Implementation
  return <div className={`component-name ${className}`}>{children}</div>
}
```

## 📊 State Management

Using Zustand for lightweight global state:

```typescript
// Access state
const { selectedYear, setSelectedYear } = useAppStore()

// Update
setSelectedYear(2024)
```

Keep state minimal and component-focused.

## 🚨 Error Handling

Always catch and handle errors:

```typescript
try {
  await loadData()
} catch (error) {
  const err = error instanceof Error ? error : new Error('Unknown error')
  console.error('Operation failed:', err)
  setError(err)
  onError?.(err)
}
```

## 📝 Environment Variables

Required (or features won't work):
- `VITE_CESIUM_ION_TOKEN` - Cesium 3D mapping

Optional:
- `VITE_CARTO_API_KEY` - Real estate data
- `VITE_PHILLY_DATA_API` - Philadelphia datasets
- `VITE_BING_MAPS_KEY` - Alternate imagery

## 🚀 Production Deployment

```bash
# Build optimized bundle
npm run build

# Test production build
npm run preview

# Deploy dist/ folder to hosting (Vercel, Netlify, etc.)
```

## 🐛 Troubleshooting

**Cesium viewer not showing:**
- Check `.env` for valid `VITE_CESIUM_ION_TOKEN`
- Look at console errors

**Components not rerendering:**
- Verify Zustand store updates
- Check React DevTools for state changes

**Performance issues:**
- Reduce neighborhood count for testing
- Check network tab for slow API calls
- Profile with React DevTools Profiler

## 📚 Resources

- [CesiumJS Documentation](https://cesium.com/docs/)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/)

## 📄 License

[Specify your license]

---

**Last Updated:** May 2026  
**Current Version:** 0.0.1
