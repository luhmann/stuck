<template>
  <div>
    <app-header />
    <Error v-if="hasError" />
    <Loading v-else-if="isLoading" />
    <Tracks v-else-if="recentTracks.length" />
    <NoTracksYet v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['isLoading', 'isAuthenticated', 'areRecentTracksLoaded', 'hasError', 'recentTracks'])
  },
  methods: {
    requestRecentTracks () {
      this.$store.dispatch(REQUEST_RECENT_TRACKS)
    },
  }
}
</script>
