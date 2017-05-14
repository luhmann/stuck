import { spotifyEndpoint } from './common'
import { RECENTLY_PLAYED_URL } from './urls'

const getRecentTracks = () =>
  spotifyEndpoint.get(RECENTLY_PLAYED_URL).then(response => response.data)

const api = {
  getRecentTracks
}

export default Object.freeze(api)
