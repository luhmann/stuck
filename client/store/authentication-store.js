import {
  SET_AUTHENTICATION,
  SET_AUTHENTICATION_STATE,
  RESET_AUTHENTICATION,
} from './mutation-types'

const authenticationStore = {
  state: {
    authenticated: false,
    authenticatedBefore: false,
    authenticationState: null,
    token: null,
    expires: null,
    requestedAt: null,
  },
  mutations: {
    [SET_AUTHENTICATION](state, payload) {
      state.authenticated = true
      state.authenticatedBefore = true
      state.token = payload.token
      state.expires = payload.expires
      state.requestedAt = payload.requestedAt
    },
    [RESET_AUTHENTICATION](state) {
      state.authenticated = false
      state.authenticationState = null
    },
    [SET_AUTHENTICATION_STATE](state, payload) {
      state.authenticationState = payload
    },
  },
  actions: {},
  getters: {
    authorizationToken: ({ token }) => token,
    isAuthenticated: ({ authenticated }) => authenticated,
  },
}

export default authenticationStore
