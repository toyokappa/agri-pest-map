<template lang="pug">
v-app
  v-main
    gmap-map(
      :center="mapLocation"
      :zoom="mapZoom"
      :style="mapStyle"
      :options="mapOptions"
    )
      gmap-marker(
        :position="mapLocation"
        :icon="markerIcon"
        :optimized="true"
      )
    v-btn(
      fixed
      bottom
      left
      dark
      large
      color="red"
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
import { MapLocation, MapOptions, MapStyle } from '~/types/googleMap'
import currentMarker from '~/assets/images/currentMarker.svg'

@Component
export default class PageIndex extends Vue {
  mapLocation: MapLocation = { lat: 0, lng: 0 }
  mapZoom: number = 16
  mapStyle: MapStyle = { height: '100vh', width: '100%'}
  mapOptions: MapOptions = {
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false
  }
  markerIcon = {
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
    this.mapLocation = {
      lat: currentPosition.coords.latitude,
      lng: currentPosition.coords.longitude
    }
  }

  async mounted () {
    await this.setCurrentLocation()
    console.log(currentMarker)
  }
}
</script>
