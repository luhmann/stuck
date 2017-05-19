import spotifyEndpoint from './common'
import { LIBRARY_SAVED_TRACKS_CONTAIN, LIBRARY_TRACKS } from './urls'

const checkLibraryContains = (trackIds = []) =>
  spotifyEndpoint
    .get(LIBRARY_SAVED_TRACKS_CONTAIN, {
      params: {
        ids: trackIds.join(','),
      },
    })
    .then(response => response.data)

const saveTracksToLibrary = (trackIds = []) =>
  spotifyEndpoint.put(LIBRARY_TRACKS, trackIds).then(response => response.data)

const removeTracksFromLibrary = (trackIds = []) =>
  spotifyEndpoint
    .delete(LIBRARY_TRACKS, {
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
