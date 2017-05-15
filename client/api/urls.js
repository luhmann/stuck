import qs from 'query-string'

export const RECENTLY_PLAYED_URL = '/me/player/recently-played'

const authorizationParams = {
  client_id: 'c46f26d260ed47199a729fa8e3b11219',
  redirect_uri: 'http://localhost:4000/authenticated',
  scope: 'user-read-recently-played', // space-separated
  response_type: 'token'
}

export const AUTHORIZATION_BASE_URL = `https://accounts.spotify.com/authorize`

export const getAuthorizationUrl = state =>
  `${AUTHORIZATION_BASE_URL}?${qs.stringify(Object.assign({}, authorizationParams, { state }))}`

export const ARTIST_INFO_URL = '/artists'
