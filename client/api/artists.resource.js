import * as logger from '../lib/logger'
import spotifyEndpoint from './common'
import { ARTIST_INFO_URL } from './urls'

const getArtistsInfo = (artistsIds = []) => {
  logger.info('in getArtistInfo, requestedIds:', artistsIds)

  if (artistsIds.length > 0) {
    return spotifyEndpoint
      .get(ARTIST_INFO_URL, {
        params: {
          ids: artistsIds.join(','),
        },
      })
      .then(response => response.data)
  }

  return Promise.reject(new Error('No valid artist-ids to request'))
}

const api = {
  getArtistsInfo,
}

export default Object.freeze(api)
