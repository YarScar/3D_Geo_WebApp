import React from 'react'

export default function Loader() {
  return (
    <div className="loader-overlay" role="status" aria-live="polite">
      <div className="loader-spinner" aria-hidden="true"></div>
      <div className="loader-text">Loading map data…</div>
    </div>
  )
}
