import { useEffect, useRef, useState, useCallback } from 'react'
import * as Cesium from 'cesium'
import { useAppStore } from '../../hooks/useAppStore'
import { loadNeighborhoodData } from '../../layers/dataLoader'
import { createDisplacementVisualization, interpolateColor } from './visualizationEngine'
import { CESIUM_CONFIG, CAMERA } from '../../config/constants'
import './GlobeViewer.css'

// Set Cesium Ion token only if it looks valid (avoid placeholder tokens causing 401s)
const isValidIonToken = (token: string | undefined) => {
  if (!token) return false
  const t = token.trim()
  if (t.length < 10) return false
  if (/your_|ion_token|_ion_token_here|um_ion_token_here/i.test(t)) return false
  return true
}

if (isValidIonToken(CESIUM_CONFIG.ION_TOKEN)) {
  Cesium.Ion.defaultAccessToken = CESIUM_CONFIG.ION_TOKEN
} else {
  console.warn('Cesium Ion token missing or placeholder; Ion services disabled')
}

interface GlobeViewerProps {
  onError?: (error: Error) => void
}

/**
 * GlobeViewer - Main 3D map component powered by Cesium.js
 * Renders extruded neighborhoods with displacement pressure scores
 */
export default function GlobeViewer({ onError }: GlobeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Cesium.Viewer | null>(null)
  const primitiveRef = useRef<Cesium.Primitive | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const {
    selectedYear,
    viewMode,
    selectedNeighborhood,
    neighborhoods,
    setNeighborhoods,
    setIsLoading,
    setSelectedNeighborhood,
  } = useAppStore()

  // Initialize Cesium viewer
  useEffect(() => {
    if (!containerRef.current) return

    try {
      // Select imagery provider: prefer Cesium Ion imagery/terrain when token present,
      // otherwise fall back to Bing (if configured) or OpenStreetMap.
      let imageryProvider: any
      const hasCreateWorldImagery = typeof (Cesium as any).createWorldImagery === 'function'
      const hasCreateWorldTerrain = typeof (Cesium as any).createWorldTerrain === 'function'
      const ionTokenValid = isValidIonToken(CESIUM_CONFIG.ION_TOKEN)

      if (ionTokenValid && hasCreateWorldImagery) {
        imageryProvider = (Cesium as any).createWorldImagery()
      } else if (import.meta.env.VITE_BING_MAPS_KEY) {
        imageryProvider = new Cesium.BingMapsImageryProvider({
          url: 'https://dev.virtualearth.net/',
          key: import.meta.env.VITE_BING_MAPS_KEY,
          mapStyle: Cesium.BingMapsStyle.AERIAL,
        })
      } else {
        imageryProvider = new Cesium.UrlTemplateImageryProvider({
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c'],
          credit: '© OpenStreetMap contributors',
        })
      }

      let terrainProvider: any = undefined
      if (CESIUM_CONFIG.TERRAIN_ENABLED && ionTokenValid) {
        if (hasCreateWorldTerrain) {
          terrainProvider = (Cesium as any).createWorldTerrain()
        } else if ((Cesium as any).IonResource && typeof (Cesium as any).IonResource.fromAssetId === 'function' && (Cesium as any).CesiumTerrainProvider) {
          try {
            const resource = (Cesium as any).IonResource.fromAssetId(1)
            terrainProvider = new (Cesium as any).CesiumTerrainProvider({ url: resource })
          } catch (e) {
            console.warn('Failed to create terrain via IonResource fallback:', e)
          }
        }
      }

      const viewer = new Cesium.Viewer(containerRef.current, {
        terrainProvider: terrainProvider,
        imageryProvider,
        animation: CESIUM_CONFIG.ANIMATION_ENABLED,
        baseLayerPicker: false,
        fullscreenButton: true,
        vrButton: false,
        geocoder: false,
        homeButton: true,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: CESIUM_CONFIG.TIMELINE_ENABLED,
      })

      // Set initial view to Philadelphia
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          CAMERA.PHILADELPHIA_LNG,
          CAMERA.PHILADELPHIA_LAT,
          CAMERA.INITIAL_HEIGHT
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-45),
          roll: 0.0,
        },
      })

      // Add click handler for neighborhood selection (guard if canvas missing)
      try {
        const canvas = viewer.scene && (viewer.scene as any).canvas
        if (canvas) {
          const handler = new Cesium.ScreenSpaceEventHandler(canvas)
          handler.setInputAction((click: any) => {
            const pickedObject = viewer.scene.pick(click.position)
            if (Cesium.defined(pickedObject) && pickedObject.id) {
              setSelectedNeighborhood(pickedObject.id.name)
              viewer.camera.flyTo({
                destination: pickedObject.id.center,
                duration: CAMERA.FLY_DURATION,
              })
            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        } else if (containerRef.current) {
          // Fallback: attach click listener to container to allow future enhancements
          containerRef.current.addEventListener('click', () => {
            // no-op fallback
          })
        }
      } catch (e) {
        console.warn('Failed to create ScreenSpaceEventHandler:', e)
      }

      viewerRef.current = viewer
      // Ensure the viewer has the terrain provider set and improve terrain rendering
      try {
        if (terrainProvider) {
          // Some Cesium builds require setting viewer.terrainProvider explicitly
          ;(viewer as any).terrainProvider = terrainProvider

          if (viewer.scene && viewer.scene.globe) {
            // Depth test primitives against terrain
            if (typeof (viewer.scene.globe as any).depthTestAgainstTerrain !== 'undefined') {
              ;(viewer.scene.globe as any).depthTestAgainstTerrain = true
            }

            // Enable lighting for better shading
            if (typeof (viewer.scene.globe as any).enableLighting !== 'undefined') {
              ;(viewer.scene.globe as any).enableLighting = true
            }

            // Exaggerate terrain to make low-relief areas visually obvious (adjustable)
            if (typeof (viewer.scene.globe as any).terrainExaggeration !== 'undefined') {
              ;(viewer.scene.globe as any).terrainExaggeration = 6.0
            }
          }

          // Sample terrain height at Philadelphia and add a test entity to confirm elevation
          if ((Cesium as any).sampleTerrainMostDetailed) {
            const carto = [Cesium.Cartographic.fromDegrees(CAMERA.PHILADELPHIA_LNG, CAMERA.PHILADELPHIA_LAT)]
            ;(Cesium as any).sampleTerrainMostDetailed(terrainProvider, carto)
              .then((updated: any) => {
                const height = updated && updated[0] && updated[0].height ? updated[0].height : 0
                console.log('Sampled terrain height at Philly:', height)
                viewer.entities.add({
                  position: Cesium.Cartesian3.fromDegrees(CAMERA.PHILADELPHIA_LNG, CAMERA.PHILADELPHIA_LAT, height + 2),
                  point: { pixelSize: 12, color: Cesium.Color.RED, heightReference: Cesium.HeightReference.CLAMP_TO_GROUND },
                  label: { text: 'Terrain sample', font: '12px sans-serif', style: Cesium.LabelStyle.FILL_AND_OUTLINE }
                })

                // Fly camera down close to the sample so user can see the relief
                viewer.camera.flyTo({
                  destination: Cesium.Cartesian3.fromDegrees(CAMERA.PHILADELPHIA_LNG, CAMERA.PHILADELPHIA_LAT, Math.max(500, height * 1.5)),
                  duration: 2.0,
                })
              })
              .catch((err: any) => console.warn('Terrain sampling failed:', err))
          }
        }
      } catch (e) {
        console.warn('Failed to configure or sample terrain:', e)
      }
      // Ensure there is at least one imagery layer; some Cesium builds may not auto-add
      try {
        const layerCount = viewer.imageryLayers && typeof viewer.imageryLayers.length === 'number' ? viewer.imageryLayers.length : 0
        console.log('Cesium viewer initialized. imageryLayers count:', layerCount)
        console.log('Cesium terrainProvider present:', !!terrainProvider)
        if (layerCount === 0 && imageryProvider) {
          // Use the safest API available to add the provider
          if (typeof viewer.imageryLayers.addImageryProvider === 'function') {
            viewer.imageryLayers.addImageryProvider(imageryProvider)
          } else if (typeof (Cesium as any).ImageryLayer === 'function') {
            viewer.imageryLayers.add(new (Cesium as any).ImageryLayer(imageryProvider))
          }
        }
      } catch (e) {
        console.warn('Failed to ensure imagery layer:', e)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize Cesium viewer')
      console.error('Cesium viewer error:', error)
      setError(error)
      onError?.(error)
    }
  }, [setSelectedNeighborhood, onError])

  // Load neighborhood data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await loadNeighborhoodData()
        setNeighborhoods(data)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load neighborhood data')
        console.error('Data loading error:', error)
        setError(error)
        onError?.(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [setNeighborhoods, setIsLoading, onError])

  // Update visualization based on year and view mode
  useEffect(() => {
    if (!viewerRef.current || neighborhoods.length === 0) return

    try {
      const viewer = viewerRef.current

      // Remove previous neighborhood entities (we prefix ids with "neigh-")
      viewer.entities.values
        .filter((e: any) => typeof e.id === 'string' && e.id.startsWith('neigh-'))
        .forEach((e: any) => viewer.entities.remove(e))

      // For now create simple extruded rectangle polygons as stand-ins for neighborhood footprints
      neighborhoods.forEach((neighborhood, idx) => {
        const currentScore = (neighborhood[`score${selectedYear}`] as number) || 0
        const height = (currentScore / 100) * 500 // max 500m extrude for visibility

        // Simple color mapping using interpolateColor if available, otherwise fall back
        let color = Cesium.Color.fromCssColorString('#ff6b35')
        try {
          const ramp = currentScore >= 0 ? undefined : undefined
          // call interpolateColor with absolute ramp
          color = interpolateColor(currentScore, (Cesium as any).COLOR_RAMPS || (Array.isArray ? [] : []))
        } catch {
          // fallback color gradient
          const t = Math.min(1, currentScore / 100)
          color = new Cesium.Color(1 * t + 0.1, 0.2, 1 - t, 1)
        }

        // Generate a small rectangle around Philadelphia, offset per index
        const lat = CAMERA.PHILADELPHIA_LAT + (idx - Math.floor(neighborhoods.length / 2)) * 0.02
        const lng = CAMERA.PHILADELPHIA_LNG + (idx - Math.floor(neighborhoods.length / 2)) * 0.03
        const delta = 0.012
        const west = lng - delta
        const south = lat - delta
        const east = lng + delta
        const north = lat + delta

        viewer.entities.add({
          id: `neigh-${neighborhood.name}`,
          name: neighborhood.name,
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([west, south, east, south, east, north, west, north]),
            extrudedHeight: height,
            height: 0,
            material: color.withAlpha ? color.withAlpha(0.9) : color,
            outline: true,
            outlineColor: Cesium.Color.BLACK,
          },
        })
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update visualization')
      console.error('Visualization error:', error)
      setError(error)
      onError?.(error)
    }
  }, [selectedYear, viewMode, neighborhoods, onError])

  // Cleanup
  useEffect(() => {
    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy()
      }
    }
  }, [])

  if (error) {
    return (
      <div className="globe-viewer-error">
        <p>Failed to load 3D map. Please check the console for details.</p>
      </div>
    )
  }

  return <div ref={containerRef} className="globe-viewer" />
}
