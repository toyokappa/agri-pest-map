<template lang="pug">
v-app
  v-main
    gmap-map(
      :center="currentLocation"
      :zoom="mapZoom"
      :style="mapStyle"
      :options="mapOptions"
      ref="map"
      @click="pinMap"
    )
      gmap-marker(
        :position="currentLocation"
        :icon="currentMarkerIcon"
        :optimized="true"
      )
      gmap-marker(
        :position="selectLocation"
      )
    v-slide-y-reverse-transition
      v-btn(
        @click="selectLocation = currentLocation"
        fixed
        bottom
        left
        dark
        large
        color="red"
        v-if="selectLocation"
      )
        v-icon(left) mdi-bug
        span 害虫発生を報告
    v-btn(
      @click="setCurrentLocation()"
      fixed
      bottom
      right
      fab
    )
      v-icon(color="blue") mdi-crosshairs-gps
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { MapLocation, MapOptions, MapStyle, markerIcon } from '~/types/googleMap'
import currentMarker from '~/assets/images/currentMarker.svg'

@Component
export default class PageIndex extends Vue {
  currentLocation: MapLocation = { lat: 0, lng: 0 }
  selectLocation: MapLocation | null = null
  mapZoom: number = 16
  mapStyle: MapStyle = { height: '100vh', width: '100%'}
  mapOptions: MapOptions = {
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false
  }
  currentMarkerIcon: markerIcon = {
    url: currentMarker,
    anchor: { x: 30, y: 30 },
    scaledSize: { height: 60, width: 60 },
  }

  getCurrentPosition () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  async setCurrentLocation () {
    const currentPosition: any = await this.getCurrentPosition()
    this.currentLocation = {
      lat: currentPosition.coords.latitude,
      lng: currentPosition.coords.longitude
    }
  }

  pinMap(event: any) {
    this.selectLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  }

  async mounted () {
    await this.setCurrentLocation()
  }
}
</script>
