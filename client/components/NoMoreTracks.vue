<template>
  <div class="no-more-tracks" v-if="areRecentTracksLoaded">
    You are at the end.<br>Spotify only keeps your 50 most recent tracks.
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters({
      areRecentTracksLoaded: 'recentTracksLoaded'
    })
  },

}
</script>


<style lang="postcss" scoped>
  .no-more-tracks {
    padding: var(--grid-cols-2);
    text-align: center;

    @media(--max) {
      padding: var(--grid-cols-2);
    }
  }

</style>
