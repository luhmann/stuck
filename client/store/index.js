import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { isDev } from '../lib/env'
import AuthenticationStore from './authentication-store'
import SpotifyStore from './spotify-store'
import UiStore from './ui-store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication: AuthenticationStore,
    spotify: SpotifyStore,
    ui: UiStore,
  },
  strict: isDev(),
  plugins: [
    createPersistedState({
      key: 'stuck',
      paths: ['authentication'],
    }),
  ],
})

export default store
