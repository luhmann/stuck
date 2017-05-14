<template>
  <div>{{ artistDisplayString }} – {{ name }} @ {{ dateDisplayString }}</div>
</template>

<script>
export default {
  props: [
    'artists',
    'name',
    'date'
  ],
  computed: {
    artistDisplayString () {
      return this.artists.map(artist => artist.name).join(', ')
    },
    dateDisplayString () {
      return new Date(this.date).toLocaleString()
    }
  }
}
</script>
