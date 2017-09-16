<template>
  <div>
    <app-header />
    <Error v-if="hasError" />
    <Loading v-else-if="isLoading" />
    <Tracks v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from 'components/AppHeader'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Tracks from 'components/Tracks'

import { REQUEST_RECENT_TRACKS } from '../store/action-types.js'

export default {
  components: {
    AppHeader,
    Error,
    Loading,
    Tracks
  },
  created() {
    if (!this.areRecentTracksLoaded) {
      this.requestRecentTracks()
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'isAuthenticated', 'areRecentTracksLoaded', 'hasError'])
  },
  methods: {
    requestRecentTracks () {
      this.$store.dispatch(REQUEST_RECENT_TRACKS)
    },
  }
}
</script>
