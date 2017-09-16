import {
  SET_UI_CURRENTLY_PLAYING_TRACK,
  SET_UI_LOADING,
  SET_UI_ERROR,
} from './mutation-types'

const uiStore = {
  state: {
    isLoading: true,
    error: null,
    currentTrack: null,
  },
  mutations: {
    [SET_UI_LOADING](state, payload) {
      state.isLoading = payload
    },
    [SET_UI_ERROR](state, payload) {
      state.error = payload
    },
    [SET_UI_CURRENTLY_PLAYING_TRACK](state, payload) {
      state.currentTrack = payload
    },
  },
  actions: {},
  getters: {
    isLoading: ({ isLoading }) => isLoading,
    hasError: ({ error }) => error !== null,
    errorDetails: ({ error }) => error,
  },
}

export default uiStore
