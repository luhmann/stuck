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

<style scoped>
.container {
  align-items: center;
  background-color: var(--color-dark-bg);
  color: white;
  display: grid;
  grid-template-columns: 50px 1fr 40px;
  padding: calc(2 * var(--grid-column-size)) calc(3 * var(--grid-column-size));
  padding-left: calc(2.5 * var(--grid-column-size));
}

.spotify-icon {
  height: 40px;
  width: 40px;
}
</style>
