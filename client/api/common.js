import axios from 'axios'
import store from '../store/'

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

export { spotifyEndpoint }
