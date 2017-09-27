import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import svgicon from 'vue-svgicon'
import VueProgressiveImage from 'vue-progressive-image'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import { isDev, isProd } from './lib/env'
import App from './components/App'
import router from './router'
import store from './store'
import * as storeActions from './store/common'

if (isProd()) {
  Raven.config('https://24d65ea997af48d2b571cfd9bda075cd@sentry.io/220709', {
    release: process.env.TRAVIS_COMMIT,
  })
    .addPlugin(RavenVue, Vue)
    .install()
}

sync(store, router)

if (isDev()) {
  window.store = store
  window.storeActions = storeActions
}

Vue.use(VueProgressiveImage)
Vue.use(svgicon, {
  tagName: 'svgicon',
})

const app = new Vue({
  router,
  store,
  ...App,
})

export { app, router, store }
