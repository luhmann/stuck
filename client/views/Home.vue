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

export default {
  components: {
    AppHeader,
    Loading,
    Tracks
  },
  computed: {
    ...mapGetters(['isLoading', 'isAuthenticated'])
  }
}
</script>
