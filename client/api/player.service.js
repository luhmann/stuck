import spotifyResource from './player.resource'
import { mapTracks } from './mapper'
import { uiStartLoading, uiStopLoading, uiSetError } from '../store/common'
import * as logger from 'lib/logger'

const api = {
  getRecentTracks: async() => {
    try {
      const recentTracks = await spotifyResource.getRecentTracks()
      return recentTracks.items
    } catch (error) {
      logger.error(error, error.response, error.config)
      uiSetError()
    }
  }
}

export default Object.freeze(api)
