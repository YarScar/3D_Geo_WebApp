# Development Setup & Getting Started

## Prerequisites
- Node.js 18+ 
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your API keys to .env
# - VITE_CESIUM_ION_TOKEN: Get from https://cesium.com/ion/tokens
# - VITE_PHILLY_DATA_API: Philadelphia data API endpoint (no key required)
```

## Development

```bash
# Start dev server with hot reload
npm run dev

# The app will open at http://localhost:5173
```

## Building for Production

```bash
# Build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── globe/           # Cesium 3D visualization
│   │   ├── GlobeViewer.tsx
│   │   └── visualizationEngine.ts
│   └── ui/              # UI components and panels
│       ├── Dashboard.tsx
│       ├── TimelineSlider.tsx
│       ├── ViewModeToggle.tsx
│       ├── NeighborhoodPanel.tsx
│       └── IndicatorChart.tsx
├── hooks/               # Zustand state management
│   └── useAppStore.ts
├── layers/              # Data fetching and queries
│   ├── dataLoader.ts
│   └── useNeighborhoodDetails.ts
├── styles/              # Global CSS
├── App.tsx              # Main app component
└── main.tsx             # React entry point

data/
└── processing/          # Python notebooks for data preparation
```

## Key Features

### 3D Displacement Visualization
- Extruded polygons represent neighborhoods
- Height = Displacement Pressure Score (0-2500m)
- Color ramp reflects pressure intensity

### Timeline Scrubber
- Smooth year selection (2015-2024)
- Real-time 3D update without geometry rebuild

### Dual-View Modes
- **Absolute Score**: Raw 0-100 metric
- **Velocity Diff**: Change relative to 2015 baseline

### Interactive Neighborhood Panel
- Click neighborhood to focus camera
- View detailed metrics and indicators
- Historical sparklines for trend analysis

## API Integration

### Cesium Ion
Provides satellite imagery and terrain for the 3D map. Get a token at https://cesium.com/ion/tokens

### Philadelphia Open Data
Municipal datasets via data.phila.gov API (no API key required)

### Philadelphia Open Data
Municipal datasets via data.phila.gov API

## Data Format

Neighborhoods are stored as GeoJSON with annual scores:

```json
{
  "type": "Feature",
  "properties": {
    "name": "Center City",
    "score2015": 45,
    "score2016": 48,
    ...
    "score2024": 72
  },
  "geometry": { "type": "Polygon", "coordinates": [...] }
}
```

## Performance Notes

- Uses Cesium's primitive rendering for 60 FPS performance
- React Query caches neighborhood details
- Zustand for lightweight global state
- Smooth color/height transitions without geometry rebuilds

## Troubleshooting

**Cesium not loading**: Ensure `VITE_CESIUM_ION_TOKEN` is set in `.env`

**Map not showing**: Check browser console for terrain/imagery loading errors

**Slow interactions**: Reduce neighborhood count or optimize GeoJSON

## Contributing

1. Create a feature branch
2. Make changes and test locally
3. Submit PR with description of changes

## License

[Add your license here]
