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
import moment from '../lib/moment-wrapper'

import LibraryButton from 'components/LibraryButton'
import SoundAnimation from 'components/SoundAnimation'
import { SET_UI_CURRENTLY_PLAYING_TRACK } from '../store/mutation-types'

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
      return moment(this.date).fromNow()
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
  // grid-template-columns: min-content min-content 48vw 1fr;
  grid-template-columns: calc(4 * var(--grid-column-size)) 15vw 46vw 1fr;
  grid-gap: var(--grid-cols-1);
  overflow: hidden;
  padding: var(--grid-cols-2) var(--grid-cols-1);
  position: relative;

  @media (--tablet) {
    grid-gap: var(--grid-cols-2);
  }


  &__img, &__title, &__artist, &__played-at {
    position: relative;
    @util truncate;
  }

  &__img, &__img-placeholder {
    max-height: calc(13 * var(--grid-column-size));
    object-fit: cover;
    max-width: calc(13 * var(--grid-column-size));
    height: 15vw;
    width: 15vw;
  }

  &__title {
    margin-bottom: calc(0.5 * var(--grid-column-size));
    max-width: calc(82 * var(--grid-column-size));
  }

  &__artist {
    color: var(--color-artist);
    max-width: calc(82 * var(--grid-column-size));
  }

  &__played-at {
    text-align: right;
    // max-width: calc(82 * var(--grid-column-size));
  }

  &__link {
    border-bottom: 1px solid;
    color: var(--color-artist);
    font-size: var(--font-size-small);
    text-decoration: none;
    padding-bottom: 2px;
    max-width: calc(82 * var(--grid-column-size));
  }
}
</style>
