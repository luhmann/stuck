import { spotifyEndpoint } from './common'
import { ARTIST_INFO_URL } from './urls'

import * as logger from 'lib/logger'

const getArtistsInfo = (artistsIds = []) => {
  logger.info('in getArtistInfo, requestedIds:', artistsIds)

  if (artistsIds.length) {
    return spotifyEndpoint
      .get(ARTIST_INFO_URL, {
        params: {
          ids: artistsIds.join(',')
        }
      })
      .then(response => response.data)
  } else {
    return Promise.reject({
      error: { message: 'No valid artist-ids to request' }
    })
  }
}

const api = {
  getArtistsInfo
}

export default Object.freeze(api)
