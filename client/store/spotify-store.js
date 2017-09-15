import moment from 'moment'

import playerResource from '../api/player.resource'
import libraryResource from '../api/library.resource'
import { mapTracks, reduceTracksContainedInLibrary } from '../api/mapper'
import * as logger from '../lib/logger'

import {
  SET_RECENT_TRACKS,
  SET_REQUEST_IN_PROGRESS,
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

import { requestInProgress, requestCompleted, uiStopLoading } from './common'

const spotifyStore = {
  state: {
    recentTracks: {
      expires: null,
      items: [],
      cursors: {
        before: Number(Date.now()),
        after: null,
      },
      loading: false,
      loaded: false,
    },
    library: {
      savedTracks: {},
    },
  },
  mutations: {
    [SET_RECENT_TRACKS]({ recentTracks }, payload) {
      if (payload.cursors) {
        recentTracks.cursors = payload.cursors
      }

      recentTracks.items = [...recentTracks.items, ...payload.items]
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
    [SET_REQUEST_IN_PROGRESS](state, payload) {
      if (state[payload.stateSlice]) {
        state[payload.stateSlice].loading = payload.status
      } else {
        logger.error(
          'Tried to set request in progress on an unknown state-slice'
        )
      }
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
      if (getters.requestForRecentTracksInProgress === true) {
        logger.info(
          'Request for recent tracks was prevented because already in progress'
        )
        return false
      }

      requestInProgress('recentTracks')

      playerResource
        .getRecentTracks(null, getters.recentTracksCursors.before)
        .then(recentTracks => {
          commit(SET_RECENT_TRACKS, recentTracks)
          dispatch(
            REQUEST_LIBRARY_CONTAINS,
            getters.recentTracks.map(track => track.id)
          )
          requestCompleted('recentTracks')
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
    requestForRecentTracksInProgress: ({ recentTracks }) =>
      recentTracks.loading,
    recentTracksCursors: ({ recentTracks }) => recentTracks.cursors,
    recentTracks: ({ recentTracks }) => mapTracks(recentTracks.items),
    areRecentTracksLoaded: ({ recentTracks }) => recentTracks.loaded,
    isTrackInLibrary: ({ library }) => trackId =>
      Boolean(library.savedTracks[trackId]),
  },
}

export default spotifyStore
