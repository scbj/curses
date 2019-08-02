import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'

import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/services/api'
import './registerServiceWorker'
import '@/assets/compiled-svg'

Vue.config.productionTip = false

window.api = api

Vue.use(VueSVGIcon, {
  isStroke: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
