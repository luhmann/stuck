<template>
  <div>{{ artistDisplayString }} – {{ name }} - {{ dateDisplayString }}</div>
</template>

<script>
import moment from 'moment'

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
      return moment(this.date).fromNow()
    }
  }
}
</script>
