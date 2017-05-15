import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'

import {
  SET_AUTHENTICATION,
  RESET_AUTHENTICATION,
  SET_UI_ERROR,
  SET_UI_LOADING,
  SET_RECENT_TRACKS,
  ADD_ARTISTS_INFO,
  SET_ARTISTS_INFO
} from './mutation-types'
import { REQUEST_RECENT_TRACKS, REQUEST_ARTIST_INFO } from './action-types'
import artistsResource from '../api/artists.resource'
import playerResource from '../api/player.resource'

import { isDev } from 'lib/env'
import * as logger from 'lib/logger'
import { uiStartLoading, uiStopLoading } from './common'
import {
  mapTracks,
  mapTracksToArtistIds,
  reduceToKeyedArtists,
  filterIsFresh
} from '../api/mapper'

Vue.use(Vuex)

const state = {
  authentication: {
    authenticated: false,
    authenticatedBefore: false,
    token: null,
    expires: null,
    requestedAt: null
  },
  spotify: {
    recentTracks: {
      expires: null,
      items: [],
      loaded: false
    },
    artists: {}
  },
  ui: {
    isLoading: false,
    hasError: false
  }
}

const getters = {
  authorizationToken: ({ authentication }) => authentication.token,
  isAuthenticated: ({ authentication }) => authentication.authenticated,
  recentTracks: ({ spotify }) => mapTracks(spotify.recentTracks.items),
  artistsOfRecentTracks: ({ spotify }, getters) =>
    mapTracksToArtistIds(getters.recentTracks),
  isLoading: ({ ui }) => ui.isLoading
}

const mutations = {
  [SET_AUTHENTICATION] ({ authentication }, payload) {
    authentication.authenticated = true
    authentication.authenticatedBefore = true
    authentication.token = payload.token
    authentication.expires = payload.expires
    authentication.requestedAt = payload.requestedAt
  },
  [RESET_AUTHENTICATION] ({ authentication }) {
    authentication.authenticated = false
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
    spotify.recentTracks.expires = moment().add(1, 'min').valueOf() // expires in 1 minute
  },
  [SET_ARTISTS_INFO] ({ spotify }, payload) {
    spotify.artists = payload
  },
  [ADD_ARTISTS_INFO] ({ spotify }, payload) {
    spotify.artists = Object.assign({}, spotify.artists, payload)
  }
}

const actions = {
  [REQUEST_RECENT_TRACKS] ({ commit, dispatch, getters }) {
    uiStartLoading()
    playerResource.getRecentTracks().then(recentTracks => {
      commit(SET_RECENT_TRACKS, recentTracks.items)
      dispatch(REQUEST_ARTIST_INFO, getters.artistsOfRecentTracks)
      uiStopLoading()
    })
  },
  [REQUEST_ARTIST_INFO] ({ commit, getters, state }, artistsIds) {
    artistsResource
      .getArtistsInfo(
        artistsIds.filter(id => !state.spotify.artists[id] || !filterIsFresh(state.spotify.artists[id]))
      )
      .then(response => {
        commit(ADD_ARTISTS_INFO, reduceToKeyedArtists(response.artists))
      })
      .catch(data => { logger.info('Could not request artist info:', data.error) })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: isDev(),
  plugins: [
    createPersistedState({
      key: 'spotify-recent',
      paths: ['authentication', 'spotify.artists']
    })
  ]
})

export default store
