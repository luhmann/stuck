<template>
  <main>
    <spotify-track
      v-for="track in tracks"
      :key="track.id"
      :id="track.id"
      :artists="track.artists"
      :image="getImageForArtist(track.artists[0].id)"
      :name="track.name"
      :date="track.date"
      :previewUrl="track.previewUrl"
      :externalUrl="track.externalUrl"
    ></spotify-track>
    <audio-preview />
  </main>

</template>

<script>
import { mapGetters } from 'vuex'
import { REQUEST_RECENT_TRACKS } from '../store/action-types.js'

import AudioPreview from 'components/AudioPreview'
import SpotifyTrack from 'components/SpotifyTrack'

export default {
  components: {
    AudioPreview,
    SpotifyTrack
  },
  created: function () {
    if (!this.$store.state.spotify.recentTracks.loaded) {
      this.requestRecentTracks()
    }
  },
  computed: {
    ...mapGetters({
      tracks: 'recentTracks',
      getImageForArtist: 'imageForArtist'
    })
  },
  methods: {
    requestRecentTracks: function () {
      this.$store.dispatch(REQUEST_RECENT_TRACKS)
    }
  }
}
</script>

<style scoped>
  main {
    overflow: hidden;
  }
</style>
