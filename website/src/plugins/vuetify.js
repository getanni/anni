import Vue from 'vue'
import Vuetify from 'vuetify'
import { VueMasonryPlugin } from 'vue-masonry'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueMasonryPlugin)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6666f7',
        accent:  '#cd81fd'
      }
    }
  }
})