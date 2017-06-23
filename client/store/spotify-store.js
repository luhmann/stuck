import moment from 'moment'

import artistsResource from '../api/artists.resource'
import playerResource from '../api/player.resource'
import libraryResource from '../api/library.resource'
import * as logger from '../lib/logger'
import {
  mapTracks,
  mapTracksToArtistIds,
  reduceToKeyedArtists,
  reduceTracksContainedInLibrary,
  filterIsFresh,
} from '../api/mapper'

import {
  SET_RECENT_TRACKS,
  SET_ARTISTS_INFO,
  ADD_ARTISTS_INFO,
  ADD_LIBRARY_CONTAINS_INFO,
  SET_LIBRARY_CONTAINS_INFO,
} from './mutation-types'

import {
  REQUEST_RECENT_TRACKS,
  REQUEST_ARTIST_INFO,
  REQUEST_LIBRARY_CONTAINS,
  SAVE_TRACK_TO_LIBRARY,
  REMOVE_TRACK_FROM_LIBRARY,
} from './action-types'

import { uiStartLoading, uiStopLoading } from './common'

const spotifyStore = {
  state: {
    recentTracks: {
      expires: null,
      items: [],
      loaded: false,
    },
    artists: {},
    library: {
      savedTracks: {},
    },
  },
  mutations: {
    [SET_RECENT_TRACKS]({ recentTracks }, payload) {
      recentTracks.items = payload
      recentTracks.loaded = true
      recentTracks.expires = moment().add(1, 'min').valueOf() // Expires in 1 minute
    },
    [SET_ARTISTS_INFO]({ artists }, payload) {
      artists = payload
    },
    [ADD_ARTISTS_INFO]({ artists }, payload) {
      artists = Object.assign({}, artists, payload)
    },
    [ADD_LIBRARY_CONTAINS_INFO]({ library }, payload) {
      library.savedTracks = Object.assign({}, library.savedTracks, payload)
    },
    [SET_LIBRARY_CONTAINS_INFO]({ library }, payload) {
      library.savedTracks[payload.id] = payload.value
    },
  },
  actions: {
    [REQUEST_RECENT_TRACKS]({ commit, dispatch, getters }) {
      uiStartLoading()
      playerResource.getRecentTracks().then(recentTracks => {
        commit(SET_RECENT_TRACKS, recentTracks.items)
        dispatch(REQUEST_ARTIST_INFO, getters.artistsOfRecentTracks)
        dispatch(
          REQUEST_LIBRARY_CONTAINS,
          getters.recentTracks.map(track => track.id)
        )
        uiStopLoading()
      })
    },
    [REQUEST_ARTIST_INFO]({ commit, getters, state }, artistsIds) {
      artistsResource
        .getArtistsInfo(
          artistsIds.filter(
            id => !state.artists[id] || !filterIsFresh(state.artists[id])
          )
        )
        .then(response => {
          commit(ADD_ARTISTS_INFO, reduceToKeyedArtists(response.artists))
        })
        .catch(err => {
          logger.info('Could not request artist info:', err.error)
        })
    },
    [REQUEST_LIBRARY_CONTAINS]({ commit, getters }, trackIds) {
      libraryResource.checkLibraryContains(trackIds).then(response => {
        commit(
          ADD_LIBRARY_CONTAINS_INFO,
          reduceTracksContainedInLibrary(trackIds, response)
        )
      })
    },
    [SAVE_TRACK_TO_LIBRARY]({ commit }, trackId) {
      libraryResource.saveTracksToLibrary([trackId]).then(() => {
        commit(SET_LIBRARY_CONTAINS_INFO, {
          id: trackId,
          value: true,
        })
      })
    },
    [REMOVE_TRACK_FROM_LIBRARY]({ commit }, trackId) {
      console.log(trackId)
      libraryResource.removeTracksFromLibrary([trackId]).then(() => {
        commit(SET_LIBRARY_CONTAINS_INFO, {
          id: trackId,
          value: false,
        })
      })
    },
  },
  getters: {
    recentTracks: ({ recentTracks }) => mapTracks(recentTracks.items),
    artistsOfRecentTracks: (state, getters) =>
      mapTracksToArtistIds(getters.recentTracks),
    isTrackInLibrary: ({ library }) => trackId =>
      Boolean(library.savedTracks[trackId]),
    imageForArtist: ({ artists }) => artistId =>
      artists[artistId] && artists[artistId].images[1], // TODO: Find something smarter
  },
}

export default spotifyStore
