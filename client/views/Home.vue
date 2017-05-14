<template>
  <div class="page">
    <loading v-if="isLoading" />
    <tracks v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from 'components/Loading'
import Tracks from 'components/Tracks'

export default {
  components: {
    Loading,
    Tracks
  },
  computed: {
    ...mapGetters(['isLoading', 'isAuthenticated'])
  }
}
</script>
