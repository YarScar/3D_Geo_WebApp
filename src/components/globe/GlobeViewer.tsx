import { useEffect, useRef, useState, useCallback } from 'react'
import * as Cesium from 'cesium'
import { useAppStore } from '../../hooks/useAppStore'
import { loadNeighborhoodData } from '../../layers/dataLoader'
import { createDisplacementVisualization } from './visualizationEngine'
import { CESIUM_CONFIG, CAMERA } from '../../config/constants'
import './GlobeViewer.css'

// Set Cesium Ion token
Cesium.Ion.defaultAccessToken = CESIUM_CONFIG.ION_TOKEN

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
      const viewer = new Cesium.Viewer(containerRef.current, {
        terrain: CESIUM_CONFIG.TERRAIN_ENABLED ? Cesium.Terrain.fromWorldTerrain() : undefined,
        imageryProvider: new Cesium.BingMapsImageryProvider({
          url: 'https://dev.virtualearth.net/',
          key: import.meta.env.VITE_BING_MAPS_KEY,
          mapStyle: Cesium.BingMapsStyle.AERIAL,
        }),
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

      // Add click handler for neighborhood selection
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
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

      viewerRef.current = viewer
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
      // Clear previous primitive
      if (primitiveRef.current) {
        viewerRef.current.scene.primitives.remove(primitiveRef.current)
      }

      // Create new visualization
      const primitive = createDisplacementVisualization(neighborhoods, selectedYear, viewMode)

      if (primitive) {
        viewerRef.current.scene.primitives.add(primitive)
        primitiveRef.current = primitive
      }
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
