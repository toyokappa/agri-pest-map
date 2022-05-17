export interface MapLocation {
  lat: number
  lng: number
}

export interface MapStyle {
  height: string
  width: string
}

export interface MapOptions {
 streetViewControl: boolean
 zoomControl: boolean
 fullscreenControl: boolean
}

export interface markerIcon {
  url: string
  anchor: { x: number, y: number }
  scaledSize: { height: number, width: number }
}