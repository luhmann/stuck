import axios from 'axios'
import store from '../store/'

import * as logger from 'lib/logger'
import { appResetAuthorized, uiSetError } from '../store/common'

const spotifyEndpoint = axios.create({
  baseURL: `https://api.spotify.com/v1/`,
  headers: {
    Authorization: null
  }
})

spotifyEndpoint.interceptors.request.use((config) => {
  if (config.headers.Authorization === null) {
    config.headers.Authorization = `Bearer ${store.getters.authorizationToken}`
    return config
  }
})

spotifyEndpoint.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    appResetAuthorized()
  }

  logger.error(error, error.response, error.config)
  uiSetError()

  return Promise.reject(error)
})

export { spotifyEndpoint }
