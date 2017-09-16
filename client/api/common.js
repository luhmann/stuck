import axios from 'axios'
import router from '../router/'
import { ROUTE_AUTHENTICATE } from '../router/route-names'
import store from '../store/'

import { isDev, MOCK_SERVER_BASE_URL, USE_MOCK_API } from '../lib/env'
import * as logger from '../lib/logger'
import { appResetAuthorized, uiSetError, uiStopLoading } from '../store/common'

const getBaseUrl = () =>
  isDev() && USE_MOCK_API
    ? `${MOCK_SERVER_BASE_URL}/v1/`
    : `https://api.spotify.com/v1/`

const spotifyEndpoint = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Authorization: null,
    Accept: 'application/json',
  },
})

spotifyEndpoint.interceptors.request.use(config => {
  if (config.headers.Authorization === null) {
    config.headers.Authorization = `Bearer ${store.getters.authorizationToken}`
    return config
  }
})

spotifyEndpoint.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    appResetAuthorized()
    router.push({ name: ROUTE_AUTHENTICATE })
  }

  logger.error(error, error.response, error.config)
  uiSetError(error.response.data)
  uiStopLoading()

  return Promise.reject(error)
})

export default spotifyEndpoint
