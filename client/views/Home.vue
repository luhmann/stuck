<template>
  <div>
    <app-header />
    <Error v-if="hasError || (hasNoNetwork && !isInitialized)" />
    <Loading v-else-if="isLoading" />
    <Tracks v-else-if="recentTracks.length" />
    <no-tracks-yet v-else-if="isInitialized" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import AppHeader from 'components/AppHeader'
import Loading from 'components/Loading'
import Error from 'components/Error'
import NoTracksYet from 'components/NoTracksYet'
import Tracks from 'components/Tracks'

import { REQUEST_RECENT_TRACKS } from '../store/action-types.js'

export default {
  components: {
    AppHeader,
    Error,
    Loading,
    NoTracksYet,
    Tracks
  },
  created() {
    if (!this.areRecentTracksLoaded) {
      this.requestRecentTracks()
    }
  },
  computed: {
    ...mapState({
      areRecentTracksLoaded: ({ spotify }) => spotify.recentTracks.loaded,
      isLoading: ({ ui }) => ui.isLoading,
      isInitialized: ({ ui }) => ui.isInitialized,
    }),
    ...mapGetters(['isAuthenticated', 'hasError', 'recentTracks', 'hasNoNetwork'])
  },
  methods: {
    requestRecentTracks () {
      this.$store.dispatch(REQUEST_RECENT_TRACKS)
    },
  }
}
</script>
