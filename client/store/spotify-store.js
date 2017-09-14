import moment from 'moment'

import playerResource from '../api/player.resource'
import libraryResource from '../api/library.resource'
import { mapTracks, reduceTracksContainedInLibrary } from '../api/mapper'

import {
  SET_RECENT_TRACKS,
  ADD_LIBRARY_CONTAINS_INFO,
  SET_LIBRARY_CONTAINS_INFO,
  UPDATE_RECENT_TRACKS,
} from './mutation-types'

import {
  POLL_RECENT_TRACKS,
  REQUEST_RECENT_TRACKS,
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
      cursors: null,
      loaded: false,
    },
    library: {
      savedTracks: {},
    },
  },
  mutations: {
    [SET_RECENT_TRACKS]({ recentTracks }, payload) {
      recentTracks.cursors = payload.cursors
      recentTracks.items = payload.items
      recentTracks.loaded = true
      recentTracks.expires = moment()
        .add(1, 'min')
        .valueOf()
    },
    [ADD_LIBRARY_CONTAINS_INFO]({ library }, payload) {
      library.savedTracks = Object.assign({}, library.savedTracks, payload)
    },
    [SET_LIBRARY_CONTAINS_INFO]({ library }, payload) {
      library.savedTracks[payload.id] = payload.value
    },
    [UPDATE_RECENT_TRACKS]({ recentTracks }, payload) {
      if (payload.cursors) {
        recentTracks.cursors = payload.cursors
      }
      recentTracks.items = [...payload.items, ...recentTracks.items]
    },
  },
  actions: {
    [POLL_RECENT_TRACKS]({ commit, dispatch, getters }) {
      playerResource
        .getRecentTracks(getters.recentTracksCursors.after)
        .then(recentTracks => {
          commit(UPDATE_RECENT_TRACKS, recentTracks)
          dispatch(
            REQUEST_LIBRARY_CONTAINS,
            recentTracks.items.map(item => item.track.id)
          )
        })
    },
    [REQUEST_RECENT_TRACKS]({ commit, dispatch, getters }) {
      uiStartLoading()
      playerResource.getRecentTracks().then(recentTracks => {
        commit(SET_RECENT_TRACKS, recentTracks)
        dispatch(
          REQUEST_LIBRARY_CONTAINS,
          getters.recentTracks.map(track => track.id)
        )
        uiStopLoading()
      })
    },
    [REQUEST_LIBRARY_CONTAINS]({ commit, getters }, trackIds) {
      if (trackIds.length !== 0) {
        libraryResource.checkLibraryContains(trackIds).then(response => {
          commit(
            ADD_LIBRARY_CONTAINS_INFO,
            reduceTracksContainedInLibrary(trackIds, response)
          )
        })
      }
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
      libraryResource.removeTracksFromLibrary([trackId]).then(() => {
        commit(SET_LIBRARY_CONTAINS_INFO, {
          id: trackId,
          value: false,
        })
      })
    },
  },
  getters: {
    recentTracksCursors: ({ recentTracks }) => recentTracks.cursors,
    recentTracks: ({ recentTracks }) => mapTracks(recentTracks.items),
    isTrackInLibrary: ({ library }) => trackId =>
      Boolean(library.savedTracks[trackId]),
  },
}

export default spotifyStore
