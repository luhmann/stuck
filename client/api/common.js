import axios from 'axios'
import store from '../store/'
import { appResetAuthorized } from '../store/common'

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

  return Promise.reject(error)
})

export { spotifyEndpoint }
