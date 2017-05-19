<template>
  <div
    class="track"
    title="Press & hold to listen to track"
    v-touch:press="playPreviewAudio"
    v-touch:pressup="stopPreviewAudio"
    @mousedown.self="playPreviewAudio"
    @mouseup.self="stopPreviewAudio"
  >
    <LibraryButton :id="id" />
    <img class="track__img" :src="imageUrl" v-if="imageUrl" :title="id" />
    <div class="track__img-placeholder" v-else></div>
    <div class="track__info">
      <div class="track__title" :title="name">{{ name }}</div>
      <div class="track__artist" :title="artistDisplayString">{{ artistDisplayString }}</div>
    </div>
    <div class="track__played-at" :title="dateDisplayString">{{ dateDisplayString }}</div>
    <sound-animation v-if="isPlaying" />
  </div>
</template>

<script>
import moment from 'moment'

import LibraryButton from 'components/LibraryButton'
import SoundAnimation from 'components/SoundAnimation'
import { SET_UI_CURRENTLY_PLAYING_TRACK } from '../store/mutation-types.js'

export default {
  props: [
    'id',
    'image',
    'artists',
    'name',
    'date',
    'previewUrl'
  ],
  components: {
    LibraryButton,
    SoundAnimation
  },
  computed: {
    artistDisplayString() {
      return this.artists.map(artist => artist.name).join(', ')
    },
    dateDisplayString() {
      return moment(this.date).fromNow(true)
    },
    imageUrl () {
      const imageUrl = this.image && this.image.url || ''
      return imageUrl
    },
    isPlaying () {
      return this.$store.state.ui.currentTrack && this.$store.state.ui.currentTrack.id === this.id
    }
  },
  methods: {
    playPreviewAudio () {
      this.$store.commit(SET_UI_CURRENTLY_PLAYING_TRACK, {
        id: this.id,
        previewUrl: this.previewUrl
      })
    },
    stopPreviewAudio () {
      this.$store.commit(SET_UI_CURRENTLY_PLAYING_TRACK, null)
    }
  }
}
</script>

<style scoped>
  .track {
    align-items: center;
    border-bottom: 1px solid var(--color-separator);
    cursor: pointer;
    display: grid;
    grid-template-columns: 0.5fr calc(13 * var(--grid-column-size)) 5fr 1fr;
    grid-gap: calc(2 * var(--grid-column-size));
    padding: calc(2 * var(--grid-column-size)) calc(3 * var(--grid-column-size));;
    position: relative;
    overflow: hidden;
  }

  .track__img, .track__img-placeholder {
    height: calc(13 * var(--grid-column-size));
    object-fit: cover;
    width: calc(13 * var(--grid-column-size));
  }

  .track__img, .track__title, .track__artist, .track__played-at {
    max-width: calc(82 * var(--grid-column-size));
    position: relative;
    z-index: 10;
    text-overflow: ellipsis;
  	white-space: nowrap;
  	overflow: hidden;
  }

  .track__title {
    margin-bottom: calc(0.5 * var(--grid-column-size));
  }

  .track__artist {
    color: var(--color-artist);
  }

  .track__played-at {
    text-align: right;
  }

</style>
