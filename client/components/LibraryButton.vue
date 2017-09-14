<template>
  <div>
    <button class="library-action library-action--added" v-if="isTrackInLibrary(id)" @click.stop="removeTrack(id)">
      <svgicon class="library-action__icon--added" icon="added" width="20" height="20" />
      <svgicon class="library-action__icon--delete" icon="delete" width="18" height="18" />
    </button>
    <button class="library-action library-action--add" title="Save to your music library" v-else @click.stop="saveTrack(id)">
      <svgicon icon="add" color="#fff" width="100%" height="100%" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SAVE_TRACK_TO_LIBRARY, REMOVE_TRACK_FROM_LIBRARY } from '../store/action-types'
import './icons'

export default {
  props: [
    'id'
  ],
  computed: {
    ...mapGetters(['isTrackInLibrary'])
  },
  methods: {
    saveTrack(id) {
      this.$store.dispatch(SAVE_TRACK_TO_LIBRARY, id)
    },
    removeTrack(id) {
      this.$store.dispatch(REMOVE_TRACK_FROM_LIBRARY, id)
    }
  }
}
</script>

<style lang="postcss" scoped>
  .library-action {
    align-self: center;
    background-color: transparent;
    cursor: pointer;
    border: none;
    height: var(--grid-cols-3);
    justify-self: center;
    padding: 0;
    width: calc(4 * var(--grid-column-size));

    &--added svg {
      fill: var(--color-spotify);
      margin-left: 2px;
    }

    @media (pointer:fine) {
      &:hover {
        .library-action__icon--delete {
          display: block;
        }

        .library-action__icon--added {
          display: none;
        }
      }
    }
  }

  svg.library-action__icon--delete {
    display: none
  }
</style>
