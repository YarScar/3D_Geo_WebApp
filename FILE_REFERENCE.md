# 📑 File Reference Guide

Complete guide to all files in the Philadelphia Neighborhood Change Tracker project.

## 📋 Root Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `.env` | Development environment variables | 🔐 Use only locally |
| `.env.example` | Template for environment variables | 📝 Share with team |
| `.eslintrc.json` | ESLint configuration (code quality) | ✅ Production |
| `.eslintignore` | Files to exclude from ESLint | ✅ Production |
| `.prettierrc.json` | Prettier code formatter config | ✅ Production |
| `.prettierignore` | Files to exclude from Prettier | ✅ Production |
| `.gitignore` | Git exclusions (120+ patterns) | ✅ Comprehensive |
| `vite.config.ts` | Vite build configuration | ✅ Production |
| `vitest.config.ts` | Vitest testing framework config | ✅ Ready |
| `tsconfig.json` | TypeScript strict mode config | ✅ Strict |
| `tsconfig.node.json` | TypeScript config for build tools | ✅ Production |
| `vite-env.d.ts` | Vite + env type declarations | ✅ Production |
| `package.json` | Dependencies & npm scripts | ✅ Production |
| `index.html` | HTML entry point | ✅ Production |

## 📚 Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Product overview & quick start | Everyone |
| `DEVELOPMENT.md` | Development setup & workflow | Developers |
| `ARCHITECTURE.md` | Design patterns & best practices | Developers |
| `SECURITY.md` | Security guidelines | Everyone |
| `QUALITY.md` | QA checklist & metrics | QA/DevOps |
| `BUILD_SUMMARY.md` | Complete build summary | Project leads |
| `FILE_REFERENCE.md` | This file | Reference |

## 🎯 Source Code Structure

### `src/App.tsx`
- Root React component
- ErrorBoundary wrapper
- Environment validation
- Component composition

### `src/main.tsx`
- React entry point
- QueryClient setup
- Provider configuration
- React 18 strict mode

### `src/types/index.ts`
- Centralized type definitions
- Neighborhood interfaces
- API response types
- Loading state types
- View mode types

### `src/config/constants.ts`
- Application-wide constants
- Timeline configuration (2015-2024)
- Displacement score ranges
- Color ramp definitions
- Cesium configuration
- Query optimization settings
- Animation durations
- Size limits

### `src/config/environment.ts`
- Environment variable validation
- Security utilities
  - `sanitizeInput()` - XSS prevention
  - `isValidUrl()` - URL validation
  - `getSecureHeaders()` - HTTP headers
- Error handling

### `src/hooks/useAppStore.ts`
- Zustand global state
- Selected year state
- Selected neighborhood state
- View mode state
- Loading state
- Neighborhood data

### `src/layers/dataLoader.ts`
- Loads neighborhood data
- Mock data for development
- GeoJSON loading function
- Data transformation

### `src/layers/useNeighborhoodDetails.ts`
- React Query hook
- Fetches detailed neighborhood info
- Caches with React Query
- Retry strategy

## 🧩 React Components

### `src/components/Button.tsx` & `Button.css`
**Reusable button component**
- Props: `variant`, `size`, `loading`, `fullWidth`
- Types: primary, secondary, danger
- Sizes: sm, md, lg
- Accessibility: aria-busy support
- Test file: `Button.test.tsx`

### `src/components/ErrorBoundary.tsx` & `ErrorBoundary.css`
**Error boundary for React errors**
- Catches component errors
- Displays fallback UI
- Development error details
- Refresh page option

### `src/components/globe/GlobeViewer.tsx`
**Main Cesium 3D viewer**
- Cesium initialization
- Terrain & imagery setup
- Click handling
- Visualization updates
- Error handling

### `src/components/globe/visualizationEngine.ts`
**3D rendering logic**
- Color ramp interpolation
- Geometry creation
- Primitive rendering
- Performance optimization

### `src/components/globe/GlobeViewer.css`
**Cesium viewer styling**
- Container styling
- Button overrides
- Error state styling

### `src/components/ui/Dashboard.tsx` & `Dashboard.css`
**Main dashboard layout**
- Header with title
- Control panels
- Timeline slider
- Footer styling

### `src/components/ui/TimelineSlider.tsx` & `TimelineSlider.css`
**Year selection slider**
- Props: startYear, endYear, onYearChange
- Reusable with any year range
- Progress visualization
- ARIA labels

### `src/components/ui/ViewModeToggle.tsx` & `ViewModeToggle.css`
**View mode selector**
- Toggle: Absolute Score ↔ Velocity Diff
- ARIA button group
- Visual feedback

### `src/components/ui/NeighborhoodPanel.tsx` & `NeighborhoodPanel.css`
**Detail sidebar**
- Click-triggered panel
- Neighborhood statistics
- Indicator charts
- Close button

### `src/components/ui/IndicatorChart.tsx` & `IndicatorChart.css`
**Sparkline chart**
- Props: name, value, sparkline, color, precision
- Recharts integration
- Reusable for any metric

## 🗂️ Public Assets

### `public/data/philly_neighborhoods_indexed.geojson`
- Sample GeoJSON file
- Neighborhood boundaries
- Historical scores (2015-2024)
- Can be replaced with real data

## 🧪 Testing Files

### `src/setup.test.ts`
- Vitest setup
- Testing Library configuration
- Mock definitions for:
  - Cesium (external 3D library)
  - Recharts (chart library)

### `src/components/Button.test.tsx`
- Example component test
- Tests rendering, interactions, accessibility
- Shows testing patterns

## 🔄 CI/CD

### `.github/workflows/ci.yml`
- GitHub Actions workflow
- Runs on push/PR to main/develop
- Type checking
- Linting
- Build verification
- Build artifact archiving

## 📦 Package.json Scripts

```json
{
  "dev": "Start development server with hot reload",
  "build": "Production build with TypeScript check",
  "build:analyze": "Analyze bundle size",
  "preview": "Preview production build",
  "lint": "ESLint check",
  "lint:fix": "Auto-fix ESLint issues",
  "format": "Format code with Prettier",
  "format:check": "Check formatting without changes",
  "type-check": "TypeScript strict check",
  "test": "Run Vitest tests",
  "test:ui": "Vitest with UI",
  "security-check": "npm audit for vulnerabilities"
}
```

## 🔐 Security-Sensitive Files

Files that should **NEVER** be committed to git:
- `.env` (local only)
- `.env.local` (local only)
- `.secrets` (if it exists)
- `*.p8`, `*.pem` (key files)

These are **protected** by `.gitignore`.

## 📊 File Size Reference

| File/Folder | Approx Size | Purpose |
|-----------|------------|---------|
| `node_modules/` | 500+ MB | Dependencies |
| `dist/` | 500-800 KB | Production build |
| `src/` | ~50 KB | Source code |
| `public/` | ~5 KB | Static assets |

## 🎯 Quick File Lookup

**Need to...** | **Edit this file:**
---|---
Add environment variable | `.env` + `.env.example`
Add lint rule | `.eslintrc.json`
Change code style | `.prettierrc.json`
Add dependency | `package.json`
Add Cesium config | `src/config/constants.ts`
Add global type | `src/types/index.ts`
Add component | `src/components/*/` folder
Add security function | `src/config/environment.ts`
Configure build | `vite.config.ts`
Setup tests | `vitest.config.ts`

## 📝 File Naming Conventions

| Pattern | Purpose | Example |
|---------|---------|---------|
| `*.tsx` | React components | `Button.tsx` |
| `*.ts` | TypeScript/logic | `constants.ts` |
| `*.css` | Component styles | `Button.css` |
| `*.test.tsx` | Component tests | `Button.test.tsx` |
| `use*.ts` | Custom hooks | `useAppStore.ts` |
| `*.md` | Documentation | `README.md` |

## ✅ File Checklist Before Commit

```
□ .env - Not committed (in .gitignore)
□ node_modules/ - Not committed (in .gitignore)
□ dist/ - Not committed (in .gitignore)
□ .eslintrc.json - Committed
□ .prettierrc.json - Committed
□ .gitignore - Committed
□ src/ files - Committed
□ package.json - Committed
□ Documentation - Committed
```

## 🚀 Deployment Checklist

Before deploying, verify:

1. **All config files exist:**
   - ✅ `.eslintrc.json`
   - ✅ `.prettierrc.json`
   - ✅ `vite.config.ts`
   - ✅ `tsconfig.json`

2. **Documentation complete:**
   - ✅ `README.md`
   - ✅ `DEVELOPMENT.md`
   - ✅ `SECURITY.md`

3. **Source code ready:**
   - ✅ All `.tsx` files formatted
   - ✅ No ESLint errors
   - ✅ Types validated
   - ✅ No `console.log()` debugging

4. **Build succeeds:**
   - ✅ `npm run build` completes
   - ✅ `npm run preview` works
   - ✅ Bundle size reasonable

---

**Total Files:** 40+  
**Lines of Code:** 5,000+  
**Documentation:** 5 guides  
**Status:** ✅ Production Ready
