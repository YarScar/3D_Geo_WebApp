# Product Specification: Philadelphia Neighborhood Change Tracker

## Product Overview
The Philadelphia Neighborhood Change Tracker is a 3D geospatial web application designed to visualize gentrification and displacement pressure across Philadelphia's neighborhoods from 2015 to 2024. The application translates multi-source municipal and federal datasets into a standardized, annual 0–100 Displacement Pressure Score per neighborhood. 

By utilizing CesiumJS, the application renders neighborhood boundaries as 3D extruded polygons where the spatial volume (height) and surface color directly correspond to socio-economic change. This transformation maps abstract statistical trends into a tangible, high-impact 3D skyline, making underlying patterns of urban displacement visible and intuitive.

---

## Target Audience & Intent
*   **Urban Researchers & Policymakers:** To identify where market changes are accelerating, stabilizing, or responding to municipal housing interventions.
*   **Community Organizers & Advocates:** To visually demonstrate systemic displacement pressures when advocating for equitable development policies.
*   **Residents & Public Users:** To engage with local data transparently, understanding history and trajectory through interactive exploration.

---

## Key Features & User Interactions

### 1. 3D Displacement Skyline
*   Neighborhood boundaries are rendered as 3D extruded blocks overlaid onto a high-resolution real-world terrain map.
*   Extrusion heights map linearly to the Displacement Pressure Score (e.g., 0 meters to 2,500 meters) to capture striking visual variation across the landscape.
*   Polygons dynamically color-shift using a custom color ramp running from a cool blue (low pressure) to hot coral/red (high pressure).

### 2. Historical Timeline Slider
*   A responsive timeline slider allows users to scrub seamlessly across a 10-year span (2015 to 2024).
*   Scrubbing smoothly recalculates heights and colors across all polygons without triggering network requests or rebuilding geometries.

### 3. Dual-View Mode Engine
*   **Absolute Score View:** Displays the raw, calculated metric score (0–100) for the selected historical year.
*   **Velocity Diff View:** Calculates and reflects the rate of change relative to the 2015 base year ($Score_{SelectedYear} - Score_{2015}$). This view utilizes a diverging color ramp (deep blue for stabilizing areas; vibrant crimson for accelerating hotspots) to reveal market momentum.

### 4. Interactive Live Scorecard Panel
*   Clicking a neighborhood poly-block smoothly centers the camera view and opens a dedicated contextual sidebar.
*   The panel showcases a breakdown of the four underlying index indicators alongside historical sparklines charting regional behavior.
*   Opening this panel fires asynchronous queries to harvest real-time property transactions and active operational records from city infrastructure.

---

## Data Architecture & Flow

To maintain a fluid 60 FPS user experience while computing multifaceted multi-year indexes, the application utilizes a hybrid tiered data loading engine.


philly-change-tracker/
├── data/
│   ├── processing/             # Python analytical notebooks, metric normalization, and data preparation tasks
│   └── philly_neighborhoods_indexed.geojson  # High-performance spatial foundation file with embedded multi-year metrics
├── src/
│   ├── assets/                 # Brand graphics, icons, and logo components
│   ├── components/
│   │   ├── globe/              # Core Cesium instance initialization, material engines, and map update wrappers
│   │   └── ui/                 # Overlay dashboard pieces, sidebars, indicator charts, and slider controls
│   ├── hooks/                  # Global Zustand state hooks and custom event configurations
│   ├── layers/                 # Data-fetching hooks, Philadelphia Open Data API query syntax, and React Query orchestration pipelines
│   ├── styles/                 # Pure CSS sheets detailing sidebar transitions, layout metrics, and slider structures
│   ├── App.tsx                 # Base coordinate frame tying state and workspace layers together
│   ├── main.tsx                # Application bootstrap containing global QueryClient configurations
│   └── vite-env.d.ts           # Global type assertions for environment configurations and assets
├── .env.example                # Blueprint file demonstrating local environment variable configuration needs
├── index.html                  # Main application DOM mount point and script linking node
├── package.json                # Project dependencies and script declarations
├── vite.config.ts              # Minimal configuration deploying react() and vite-plugin-cesium()
└── README.md                   # Core developer manual and overview guide