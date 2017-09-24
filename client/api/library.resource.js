import spotifyEndpoint from './common'
import { LIBRARY_SAVED_TRACKS_CONTAIN, LIBRARY_TRACKS } from './urls'

const checkLibraryContains = (trackIds = [], userInitiated = true) =>
  spotifyEndpoint
    .get(LIBRARY_SAVED_TRACKS_CONTAIN, {
      meta: {
        userInitiated,
      },
      params: {
        ids: trackIds.join(','),
      },
    })
    .then(response => response.data)

const saveTracksToLibrary = (trackIds = [], userInitiated = true) =>
  spotifyEndpoint
    .put(LIBRARY_TRACKS, trackIds, {
      meta: {
        userInitiated,
      },
    })
    .then(response => response.data)

const removeTracksFromLibrary = (trackIds = [], userInitiated = true) =>
  spotifyEndpoint
    .delete(LIBRARY_TRACKS, {
      meta: {
        userInitiated,
      },
      params: {
        ids: trackIds.join(','),
      },
    })
    .then(response => response.data)

const api = {
  checkLibraryContains,
  saveTracksToLibrary,
  removeTracksFromLibrary,
}

export default Object.freeze(api)
