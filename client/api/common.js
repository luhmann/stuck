import axios from 'axios'
import router from '../router/'
import { ROUTE_AUTHENTICATE } from '../router/route-names'
import store from '../store/'

import { isDev, MOCK_SERVER_BASE_URL, USE_MOCK_API } from '../lib/env'
import * as logger from '../lib/logger'
import {
  API_ERROR,
  GENERAL_ERROR,
  NETWORK_ERROR,
  createError,
} from '../lib/utils'
import {
  appResetAuthorized,
  uiSetError,
  uiClearError,
  uiStopLoading,
} from '../store/common'

import { getAuthorizationUrl } from './urls'

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

spotifyEndpoint.interceptors.response.use(
  response => {
    uiClearError()
    return response
  },
  error => {
    try {
      if (error.response) {
        if (error.response.status === 401) {
          appResetAuthorized()
          if (store.state.authentication.authenticatedBefore) {
            window.location.assign(getAuthorizationUrl())
            return
          }

          // Default case
          router.push({ name: ROUTE_AUTHENTICATE })
        }

        logger.error(error, error.response, error.config)
        uiSetError(
          createError(
            API_ERROR,
            error.config.meta.userInitiated,
            error.response.data.error || { status: error.response.status }
          )
        )
        return Promise.reject(createError(API_ERROR))
      } else if (error.request) {
        logger.info('Could not establish a connection', navigator.onLine)
        uiSetError(createError(NETWORK_ERROR, error.config.meta.userInitiated))

        return Promise.reject(createError(NETWORK_ERROR))
      }
    } catch (err) {
      uiSetError(createError(GENERAL_ERROR))
      logger.error('Encountered a non-api-error:', err)
      return Promise.reject(createError(GENERAL_ERROR))
    } finally {
      uiStopLoading()
    }

    return Promise.reject(error)
  }
)

export default spotifyEndpoint
