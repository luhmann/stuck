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
      <a class="track__link" :href="externalUrl" target="_blank">View in Spotify</a>
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
    'previewUrl',
    'externalUrl'
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

<style lang="postcss" scoped>
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


  &__img, &__img-placeholder {
    height: calc(13 * var(--grid-column-size));
    object-fit: cover;
    width: calc(13 * var(--grid-column-size));
  }

  &__img, &__title, &__artist, &__played-at {
    max-width: calc(82 * var(--grid-column-size));
    position: relative;
    z-index: 10;
    text-overflow: ellipsis;
  	white-space: nowrap;
  	overflow: hidden;
  }

  &__title {
    margin-bottom: calc(0.5 * var(--grid-column-size));
  }

  &__artist {
    color: var(--color-artist);
  }

  &__played-at {
    text-align: right;
  }

  &__link {
    border-bottom: 1px solid;
    color: var(--color-artist);
    font-size: 12px;
    text-decoration: none;
    padding-bottom: 2px;
  }
}
</style>
