<template>
  <div>
    <button
      class="library-action library-action--added"
      v-if="isTrackInLibrary(id)"
      @click="removeTrack(id)"
    >
      <svgicon class="library-action__icon--added" icon="added" width="20" height="20" />
      <svgicon class="library-action__icon--delete" icon="delete" width="20" height="20" />
    </button>
    <button
      class="library-action library-action--add"
      title="Save to your music library"
      v-else
      @click="saveTrack(id)"
    >
      <svgicon icon="add" color="#fff" width="20" height="20" />
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
    saveTrack (id) {
      this.$store.dispatch(SAVE_TRACK_TO_LIBRARY, id)
    },
    removeTrack (id) {
      this.$store.dispatch(REMOVE_TRACK_FROM_LIBRARY, id)
    }
  }
}
</script>

<style lang="postcss" scoped>
  .library-action {
    background-color: transparent;
    cursor: pointer;
    border: none;
    height: calc(3 * var(--grid-column-size));
    padding: 0;
    width: calc(3 * var(--grid-column-size));

    &--added svg {
      fill: var(--color-spotify);
      margin-left: 2px;
    }

    &:hover {
      .library-action__icon--delete {
        display: block;
      }

      .library-action__icon--added {
        display: none;
      }
    }

    &__icon--delete {
      display: none
    }
  }
</style>
