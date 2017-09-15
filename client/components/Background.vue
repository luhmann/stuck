<template>
  <progressive-background class="bg" v-if="displayBg" :src="bgImgUrl" :placeholder="bgImgUrl" />
</template>

<script>

const backgroundImages = [
  'bokeh.jpg',
  'concert_1.jpg',
  'concert_2.jpg',
  'concert_3.jpg',
  'deck_blur.jpg',
  'disco.jpg'
];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomImage = imgArray => imgArray[getRandomIntInclusive(0, imgArray.length - 1)]

export default {
  computed: {
    bgImageStyles() {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        return {backgroundImage: `url('/backgrounds/${getRandomImage(backgroundImages)}')`}
      } else {
        return {}
      }
    },
    displayBg() {
      return window.matchMedia('(min-width: 1024px)').matches
    },
    bgImgUrl() {
      return `/backgrounds/${getRandomImage(backgroundImages)}`
    }
  }
}
</script>


<style lang="postcss" scoped>
.bg {
  display: none;
  @media(--max) {
    background: #000;
    background-size: cover;
    background-repeat: no-repeat;
    display: block;
    height: 100vh;
    position: fixed;
    left: 0;
    top: calc(10.5 * var(--grid-column-size));
    width: 100vw;
    z-index: var(--z-index-below);
  }
}
</style>
