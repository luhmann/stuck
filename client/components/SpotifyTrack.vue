<template>
  <div
    class="track"
    @click="togglePreviewAudio"
  >
    <LibraryButton :id="id" />
    <ResponsiveImage class="track__img" :images="images" v-if="images" :title="id" />
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
import ResponsiveImage from 'components/ResponsiveImage'
import SoundAnimation from 'components/SoundAnimation'
import { SET_UI_CURRENTLY_PLAYING_TRACK } from '../store/mutation-types'

export default {
  props: [
    'id',
    'images',
    'artists',
    'name',
    'date',
    'previewUrl',
    'externalUrl',
    'now'
  ],
  components: {
    LibraryButton,
    ResponsiveImage,
    SoundAnimation
  },
  computed: {
    artistDisplayString() {
      return this.artists.map(artist => artist.name).join(', ')
    },
    dateDisplayString() {
      return moment(this.date).from(this.now)
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
    },
    togglePreviewAudio () {
      if(this.isPlaying) {
        this.stopPreviewAudio()
      } else {
        this.playPreviewAudio()
      }
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
    grid-template-columns: calc(4 * var(--grid-column-size)) 15vw 46vw 1fr;
    grid-gap: var(--grid-cols-1);
    overflow: hidden;
    padding: var(--grid-cols-2) var(--grid-cols-1);
    position: relative;

    @media (--tablet) {
      grid-gap: var(--grid-cols-2);
    }

    @media(--max) {
      grid-template-columns: calc(4 * var(--grid-column-size)) calc(13 * var(--grid-column-size)) calc(92 * var(--grid-column-size)) 1fr;
      padding: var(--grid-cols-2);
    }

    @supports (grid-template-columns: min-content) {
      grid-template-columns: min-content min-content 48vw 1fr;

      @media(--max) {
        grid-template-columns: min-content min-content calc(92 * var(--grid-column-size)) 1fr;
      }
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

    &__info {
      max-width: 46vw;
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
      font-size: var(--font-size-small);
      text-decoration: none;
      padding-bottom: 2px;
      max-width: calc(82 * var(--grid-column-size));
    }
  }
</style>
