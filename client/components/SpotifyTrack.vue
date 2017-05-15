<template>
  <div class="track" >
    <div class="track__background-img" :style="`background-image: url(${imageUrl})`"></div>
    <div class="track__shim"></div>
    <div class="track__info">
      <img class="track__img" :src="imageUrl" />
      <div class="track__title">{{ name }}</div>
      <div class="track__artist">{{ artistDisplayString }}</div>
      <div class="track__played_at">{{ dateDisplayString }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: [
    'image',
    'artists',
    'name',
    'date'
  ],
  computed: {
    artistDisplayString () {
      return this.artists.map(artist => artist.name).join(', ')
    },
    dateDisplayString () {
      return moment(this.date).fromNow()
    },
    imageUrl () {
      const imageUrl = this.image && this.image.url || ''
      return imageUrl
    }
  }
}
</script>

<style scoped>
  .track {
    border-bottom: 1px solid #282828;
    padding: 16px 24px;
    position: relative;
    overflow: hidden;
  }

  .track__background-img {
    background: transparent none center center no-repeat;
    background-size: cover;
    filter: blur(8px);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .track__shim {
    background-color: rgba(0, 0, 0, 0.7);
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .track__img {
    height: 100px;
    object-fit: cover;
    width: 100px;
  }

  .track__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
  }

  .track__title {
    /*flex-grow: 1;*/
  }
</style>
