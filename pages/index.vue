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
    v-dialog(
      v-model="dialog"
      persistent
    )
      template(v-slot:activator="{ on, attrs }")
        v-slide-y-reverse-transition
          v-btn(
            fixed
            bottom
            left
            dark
            large
            color="red"
            v-bind="attrs"
            v-on="on"
            v-if="selectLocation"
          )
            v-icon(left) mdi-bug
            span 害虫発生を報告
      template(v-slot:default="dialog")
        v-card
          v-card-title ピン留めした位置での害虫発生を報告しますか？
          v-card-text ピン留めをし直したい場合は、この画面を「いいえ」で閉じて、今一度正しい位置へピン留めをしてください。
          v-card-actions
            v-spacer
            v-btn(
              color="red"
              text
              @click="cancel"
            ) いいえ
            v-btn(
              color="green"
              text
              @click="submit"
            ) はい
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
  dialog: boolean = false

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

  cancel () {
    this.dialog = false
  }

  submit () {
    // TODO: 情報送信処理を挟む
    this.selectLocation = null
    this.dialog = false
  }

  async mounted () {
    await this.setCurrentLocation()
  }
}
</script>
