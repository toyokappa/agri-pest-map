import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC8RKXS1Lc-gzbdbgWRnOtIm36I4RKUMlA',
    libraries: 'places',
  },
})