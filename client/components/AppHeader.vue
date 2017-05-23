<template>
  <div class="container">
    <svgicon icon="ribbon" width="50" height="50" />
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
  color: white;
  display: grid;
  grid-template-columns: 50px 1fr 40px;
  padding: var(--grid-cols-2) var(--grid-cols-1);
  padding-left: 0;
  position: sticky;
  top: 0;
  z-index: var(--z-index-medium);

  @media (--tablet) {
    padding: var(--grid-cols-2) var(--grid-cols-3);
  }
}

.spotify-icon {
  height: 40px;
  width: 40px;
}
</style>
