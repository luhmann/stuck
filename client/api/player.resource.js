import spotifyEndpoint from './common'
import { RECENTLY_PLAYED_URL } from './urls'

const getRecentTracks = (after = null, before = null) =>
  spotifyEndpoint
    .get(RECENTLY_PLAYED_URL, {
      params: {
        limit: 40,
        after,
        before,
      },
    })
    .then(response => response.data)

const api = {
  getRecentTracks,
}

export default Object.freeze(api)
