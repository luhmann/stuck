<template>
  <main>
    <transition-group name="slide-fade" tag="div">
      <spotify-track
        v-for="track in tracks"
        :key="track.id"
        :id="track.id"
        :artists="track.artists"
        :images="track.album.images"
        :name="track.name"
        :date="track.date"
        :previewUrl="track.previewUrl"
        :externalUrl="track.externalUrl"
        :now="now"
      ></spotify-track>
    </transition-group>
    <no-more-tracks />
    <audio-preview />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from '../lib/moment-wrapper'
import { REQUEST_RECENT_TRACKS, POLL_RECENT_TRACKS } from '../store/action-types.js'
import { ELAPSED_UPDATE_INTERVAL, POLLING_INTERVAL } from '../lib/env'

import AudioPreview from 'components/AudioPreview'
import NoMoreTracks from 'components/NoMoreTracks'
import SpotifyTrack from 'components/SpotifyTrack'

export default {
  components: {
    AudioPreview,
    NoMoreTracks,
    SpotifyTrack
  },
  data() {
    return {
      now: moment()
    }
  },
  mounted() {
    this.pollingInterval = setInterval(this.pollRecentTracks, POLLING_INTERVAL)
    this.nowInterval = setInterval(() => {
      this.now = moment()
    }, ELAPSED_UPDATE_INTERVAL);
  },
  destroyed() {
    clearInterval(this.pollingInterval)
    clearInterval(this.nowInterval)
  },
  computed: {
    ...mapGetters({
      tracks: 'recentTracks',
    })
  },
  methods: {
    pollRecentTracks () {
      this.$store.dispatch(POLL_RECENT_TRACKS)
    }
  }
}
</script>

<style scoped>
  main {
    overflow: hidden;
    position: relative;
    z-index: var(--z-index-low);
  }

  .slide-fade-enter-active, .slide-fade-move {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 1.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
