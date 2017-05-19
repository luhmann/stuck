import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import svgicon from 'vue-svgicon'
import VueTouch from 'vue-touch-easyhi'

import { isDev } from '../lib/env'

import App from './components/App'
import router from './router'
import store from './store'
import * as storeActions from './store/common'

sync(store, router)

if (isDev()) {
  window.store = store
  window.storeActions = storeActions
}

Vue.use(svgicon, {
  tagName: 'svgicon',
})

Vue.use(VueTouch)

const app = new Vue({
  router,
  store,
  ...App,
})

export { app, router, store }
