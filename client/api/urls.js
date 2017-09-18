import qs from 'query-string'

import { isDev } from '../lib/env'

const BASE_URL = isDev() ? 'http://svo.dev:4000' : 'http://stuck.luhmann.me'

export const RECENTLY_PLAYED_URL = '/me/player/recently-played'

const authorizationScopes = [
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
]

/* eslint-disable camelcase */
const authorizationParams = {
  client_id: 'c46f26d260ed47199a729fa8e3b11219',
  redirect_uri: `${BASE_URL}/authenticated`,
  scope: authorizationScopes.join(' '), // DOC: space-separated
  response_type: 'token',
}

export const AUTHORIZATION_BASE_URL = `https://accounts.spotify.com/authorize`

export const getAuthorizationUrl = state =>
  `${AUTHORIZATION_BASE_URL}?${qs.stringify(
    Object.assign({}, authorizationParams, { state })
  )}`

export const LIBRARY_SAVED_TRACKS_CONTAIN = '/me/tracks/contains'
export const LIBRARY_TRACKS = '/me/tracks'
