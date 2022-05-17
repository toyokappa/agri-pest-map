<template lang="pug">
v-app
  v-main
    v-container(fluid)
      v-card
        gmap-map(
          :center="mapLocation"
          :zoom="mapZoom"
          :style="mapStyle"
          :options="mapOptions"
        )
      v-btn(
        @click="setCurrentLocation()"
      ) 現在地を取得
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageIndex extends Vue {
  mapLocation: { lat: number, lng: number } = { lat: 0, lng: 0 }
  mapZoom: number = 16
  mapStyle: { height: string, width: string } = { height: '400px', width: '100%'}
  mapOptions: { streetViewControl: boolean, style: [] } = { streetViewControl: false, style: [] }

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
  }
}
</script>
