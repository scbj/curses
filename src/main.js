import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueSVGIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
