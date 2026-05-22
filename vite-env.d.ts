/// <reference types="vite/client" />

declare module 'cesium' {
  export * from 'cesium';
}

interface ImportMetaEnv {
  readonly VITE_CESIUM_ION_TOKEN: string
  readonly VITE_CARTO_API_KEY: string
  readonly VITE_CARTO_BASE_URL: string
  readonly VITE_PHILLY_DATA_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
