<template></template>

<script>
import { mapState } from 'vuex'
const START_VOLUME = 0
const TARGET_VOLUME = 1

export default {
  created () {
    this.audioObject = new Audio()
    this.interval = null
  },
  computed: {
    ...mapState({ currentTrack: state => state.ui.currentTrack })
  },
  methods: {
    fadeIn () {
      this.audioObject.volume = START_VOLUME

      this.interval = setInterval(() => {
        const newVolume = this.audioObject.volume + 0.1

        if (newVolume < TARGET_VOLUME) {
          this.audioObject.volume = newVolume
        } else {
          this.audioObject.volume = TARGET_VOLUME
          clearInterval(this.interval)
        }
      }, 100)
    },
    fadeOut () {
      this.interval = setInterval(() => {
        const newVolume = this.audioObject.volume - 0.1

        if (newVolume > START_VOLUME) {
          this.audioObject.volume = newVolume
        } else {
          this.audioObject.volume = START_VOLUME
          clearInterval(this.interval)
          this.audioObject.pause()
        }
      }, 50)
    },
    playPreviewAudio () {
      if (this.audioObject.src !== this.currentTrack.previewUrl) {
        this.audioObject.src = this.currentTrack.previewUrl
        this.fadeIn()
      } else {
        this.audioObject.volume = TARGET_VOLUME
      }
      this.audioObject.play()
    },
    stopPreviewAudio () {
      this.fadeOut()
    }
  },
  watch: {
    currentTrack (val) {
      if (val !== null) {
        this.playPreviewAudio()
      } else {
        this.stopPreviewAudio()
      }
    }
  }
}
</script>
