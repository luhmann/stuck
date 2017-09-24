import { RECENT_TRACKS_BATCH_SIZE } from '../lib/env'

import spotifyEndpoint from './common'
import { RECENTLY_PLAYED_URL } from './urls'

const getRecentTracks = (after = null, before = null, userInitiated = true) =>
  spotifyEndpoint
    .get(RECENTLY_PLAYED_URL, {
      meta: {
        userInitiated,
      },
      params: {
        limit: RECENT_TRACKS_BATCH_SIZE,
        after,
        before,
      },
    })
    .then(response => response.data)

const api = {
  getRecentTracks,
}

export default Object.freeze(api)
