<template>
  <div>
    <app-header />
    <loading v-if="isLoading" />
    <tracks v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from 'components/AppHeader'
import Loading from 'components/Loading'
import Tracks from 'components/Tracks'

import { REQUEST_RECENT_TRACKS } from '../store/action-types.js'

export default {
  components: {
    AppHeader,
    Loading,
    Tracks
  },
  created() {
    if (!this.areRecentTracksLoaded) {
      this.requestRecentTracks()
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'isAuthenticated', 'areRecentTracksLoaded'])
  },
  methods: {
    requestRecentTracks () {
      this.$store.dispatch(REQUEST_RECENT_TRACKS)
    },
  }
}
</script>
