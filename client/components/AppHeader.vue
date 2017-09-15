<template>
  <div class="container">
    <svgicon class="logo" icon="ribbon" width="30" height="50" />
    <svgicon icon="logo" width="110" height="52" />
    <img class="spotify-icon" src="/spotify_icon.png" alt="Spotify Logo" title="powered by" />
  </div>
</template>

<script>
import './icons'

export default {

}
</script>

<style lang="postcss" scoped>
.container {
  align-items: center;
  background-color: var(--color-dark-bg);
  color: var(--color-text);
  display: grid;
  grid-template-columns: calc(4 * var(--grid-column-size)) 5fr 1fr;
  grid-gap: var(--grid-cols-1);
  overflow: hidden;
  padding: var(--grid-cols-2) var(--grid-cols-1);
  position: sticky;
  top: 0;
  z-index: var(--z-index-medium);

  @media (--tablet) {
    padding: var(--grid-cols-2) var(--grid-cols-3);
  }
}

.logo {
  justify-self: center;
}

.spotify-icon {
  height: 40px;
  justify-self: center;
  width: 40px;
}
</style>
