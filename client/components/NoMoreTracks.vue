<template>
  <div class="no-more-tracks" v-if="areRecentTracksLoaded">
    You are at the end.<br>Spotify only keeps your 50 most recent tracks.
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState({ areRecentTracksLoaded: ({ spotify }) => spotify.recentTracks.loaded })
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
