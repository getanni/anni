import Vue from 'vue'
import App from '@/App.vue'

import globals from '@/plugins/globals.js'
import utility from '@/plugins/utility.js'
import coreAPI from '@/plugins/api-core.js'
import callAPI from '@/plugins/api-call.js'

import router from '@/plugins/router.js'
import vuetify from '@/plugins/vuetify.js'

Vue.config.productionTip = false

Vue.use(globals)
Vue.use(utility)
Vue.use(coreAPI)
Vue.use(callAPI)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
