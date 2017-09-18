import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

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
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 30, secure: false }),
        removeItem: key => Cookies.remove(key),
      },
    }),
  ],
})

export default store
