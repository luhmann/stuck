import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import svgicon from 'vue-svgicon'

import App from './components/App'
import router from './router'
import store from './store'
import * as storeActions from './store/common'
import { isDev } from 'lib/env'

sync(store, router)

if (isDev()) {
  window.store = store
  window.storeActions = storeActions
}

Vue.use(svgicon, {
  tagName: 'svgicon'
})

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
