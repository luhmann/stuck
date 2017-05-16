require('what-input')
import './promise-polyfill'
import { isProd } from 'lib/env'
import { app } from './app'

// Enable progressive web app support (with offline-plugin)
if (isProd()) {
  require('./pwa')
}

app.$mount('#app')
