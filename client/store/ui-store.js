import { API_ERROR, NETWORK_ERROR } from '../lib/utils'
import {
  SET_UI_CURRENTLY_PLAYING_TRACK,
  SET_UI_LOADING,
  SET_UI_ERROR,
  SET_UI_INITIALIZED,
  CLEAR_UI_ERROR,
} from './mutation-types'

const UI_ERROR_NETWORK = 'UI_ERROR_NETWORK'
const UI_ERROR_DEFAULT = 'UI_ERROR_DEFAULT'
const UI_ERROR_SPOTIFY_DOWN = 'UI_ERROR_SPOTIFY_DOWN'
const UI_ERROR_RATE_LIMIT = 'UI_ERROR_RATE_LIMIT'

const createUiError = (type, userInitiated) => ({
  type,
  userInitiated,
})

const uiStore = {
  state: {
    isLoading: true,
    error: null,
    currentTrack: null,
    isInitialized: false,
  },
  mutations: {
    [SET_UI_LOADING](state, payload) {
      state.isLoading = payload
    },
    [SET_UI_INITIALIZED](state) {
      state.isInitialized = true
    },
    [SET_UI_ERROR](state, payload) {
      if (payload.error.type === API_ERROR) {
        if (payload.error.sourceObject.status === 419) {
          state.error = createUiError(
            UI_ERROR_RATE_LIMIT,
            payload.error.userInitiated
          )
        } else if (payload.error.sourceObject.status >= 500) {
          state.error = createUiError(
            UI_ERROR_SPOTIFY_DOWN,
            payload.error.userInitiated
          )
        } else if (
          payload.error.sourceObject.status >= 400 &&
          payload.error.sourceObject.status < 500
        ) {
          state.error = createUiError(
            UI_ERROR_DEFAULT,
            payload.error.userInitiated
          )
        }
      } else if (payload.error.type === NETWORK_ERROR) {
        state.error = createUiError(
          UI_ERROR_NETWORK,
          payload.error.userInitiated
        )
      } else {
        state.error = createUiError(
          UI_ERROR_DEFAULT,
          payload.error.userInitiated
        )
      }
    },
    [CLEAR_UI_ERROR](state) {
      state.error = null
    },
    [SET_UI_CURRENTLY_PLAYING_TRACK](state, payload) {
      state.currentTrack = payload
    },
  },
  actions: {},
  getters: {
    hasError: state =>
      state.error !== null &&
      (state.isInitialized === false && state.error.type !== UI_ERROR_NETWORK),
    hasNoNetwork: ({ error }) =>
      error !== null && error.type === UI_ERROR_NETWORK,
    errorDetails: ({ error }) => error,
  },
}

export default uiStore

export {
  UI_ERROR_DEFAULT,
  UI_ERROR_NETWORK,
  UI_ERROR_RATE_LIMIT,
  UI_ERROR_SPOTIFY_DOWN,
}
