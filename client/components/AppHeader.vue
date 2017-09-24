<template>
  <header class="header">
    <svgicon class="logo" icon="ribbon" width="30" height="50" />
    <svgicon icon="logo" width="110" height="52" />
    <img class="spotify-icon" src="/spotify_icon.png" alt="Spotify Logo" title="powered by" />
    <transition name="fade">
      <no-network-indicator v-if="hasNoNetwork && isInitialized" />
    </transition>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import NoNetworkIndicator from './NoNetworkIndicator'

import './icons'

export default {
  components: {
    NoNetworkIndicator,
  },
  computed: {
    ...mapState({
      isInitialized: ({ ui }) => ui.isInitialized,
    }),
    ...mapGetters({
      hasNoNetwork: 'hasNoNetwork'
    }),
  },
}
</script>

<style lang="postcss" scoped>
.header {
  align-items: center;
  background-color: var(--color-dark-bg);
  color: var(--color-text);
  display: grid;
  grid-template-columns: calc(4 * var(--grid-column-size)) 5fr 1fr;
  grid-gap: var(--grid-cols-1);
  overflow: hidden;
  padding: calc(1.5 * var(--grid-column-size)) var(--grid-cols-1);
  position: sticky;
  top: 0;
  z-index: var(--z-index-medium);

  @media (--tablet) {
    grid-gap: var(--grid-cols-2);
  }

  @media(--max) {
    padding: var(--grid-cols-2);
  }
}

.logo {
  justify-self: center;
}

.spotify-icon {
  height: 40px;
  justify-self: flex-end;
  margin-right: 12px;
  width: 40px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
