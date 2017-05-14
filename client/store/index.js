import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


import {
  SET_AUTHENTICATION,
  SET_UI_ERROR,
  SET_UI_LOADING,
  SET_RECENT_TRACKS
} from './mutation-types'
import { REQUEST_RECENT_TRACKS } from './action-types'
import playerApi from '../api/player.service'
import { isDev } from 'lib/env'
import { mapTracks } from '../api/mapper'

Vue.use(Vuex)

const state = {
  authentication: {
    authenticated: false,
    token: null,
    expires: null,
    requestedAt: null
  },
  spotify: {
    recentTracks: {
      loaded: false,
      items: []
    }
  },
  ui: {
    isLoading: false,
    hasError: false
  }
}

const getters = {
  authorizationToken: ({ authentication }) => (authentication.token),
  isAuthenticated: ({ authentication }) => (authentication.authenticated),
  recentTracks: ({ spotify }) => (mapTracks(spotify.recentTracks.items)),
  isLoading: ({ ui }) => (ui.isLoading)
}

const mutations = {
  [SET_AUTHENTICATION] ({ authentication }, payload) {
    authentication.authenticated = true
    authentication.token = payload.token
    authentication.expires = payload.expires
    authentication.requestedAt = payload.requestedAt
  },
  [SET_UI_LOADING] ({ ui }, payload) {
    ui.isLoading = payload
  },
  [SET_UI_ERROR] ({ ui }, payload) {
    ui.hasError = payload
  },
  [SET_RECENT_TRACKS] ({ spotify }, payload) {
    spotify.recentTracks.items = payload
    spotify.recentTracks.loaded = true
  }
}

const actions = {
  [REQUEST_RECENT_TRACKS] ({ commit }) {
    commit(SET_UI_LOADING, true)
    playerApi
      .getRecentTracks()
      .then((data) => {
        commit(SET_RECENT_TRACKS, data)
        commit(SET_UI_LOADING, false)
      })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: isDev(),
  plugins: [createPersistedState({
    key: 'spotify-recent',
    paths: ['authentication']
  })]
})

export default store
