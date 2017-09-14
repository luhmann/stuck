<template></template>

<script>
import { mapState } from 'vuex'
import { SET_UI_CURRENTLY_PLAYING_TRACK } from '../store/mutation-types'

export default {
  created() {
    this.audioObject = new Audio()
    this.audioObject.addEventListener('ended', () => this.$store.commit(SET_UI_CURRENTLY_PLAYING_TRACK, null))
    this.interval = null
  },
  computed: {
    ...mapState({ currentTrack: state => state.ui.currentTrack })
  },
  methods: {
    playPreviewAudio() {
      if (this.audioObject.src !== this.currentTrack.previewUrl) {
        this.audioObject.src = this.currentTrack.previewUrl
        this.audioObject.volume = 0.5
      }
      this.audioObject.play()
    },
    stopPreviewAudio() {
      this.audioObject.pause()
    }
  },
  watch: {
    currentTrack(val) {
      if (val !== null) {
        this.playPreviewAudio()
      } else {
        this.stopPreviewAudio()
      }
    }
  }
}
</script>
