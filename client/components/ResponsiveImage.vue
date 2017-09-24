<template>
  <img
    :src="imageUrl"
    :srcset="srcset"
    sizes="(max-width: 375px) 64px, 208px"
    :alt="altText"
    :title="altText"
  />
</template>

<script>
export default {
  props: [
    'images',
    'altText'
  ],
  computed: {
    imageUrl () {
      const imageUrl = this.images && this.images[0].url || ''
      return imageUrl
    },
    sizes() {
      const sizes = this.images.map(item => item.width)
    },
    srcset() {
      return this.images.map((item) => `${item.url} ${item.width}w`).join(', ')
    }
  }
}
</script>


<style lang="postcss" scoped>

</style>
