<template>
  <main>
    <div>The Authentication Dialog</div>
    <div class="hint-authenticated-before" v-if="userAuthenticatedBefore">
      Why do I have to authenticate again?

      Spotify only grants sessions that last an hour for their app.
      So if you last authenticated more than an hour ago, you need to authenticate again.
      It should be quick.

      Sorry for the inconvenience!
    </div>
    <a :href="authorizationUrl" title="Click to authenticate">Authenticate</a>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { getAuthorizationUrl } from '../api/urls'

export default {
  created () {
    if (this.userAuthenticatedBefore) {
      window.location.replace(this.authorizationUrl)
    }
  },
  computed: {
    authorizationUrl () {
      return getAuthorizationUrl('demo-demo-demo')
    },
    ...mapState({
      userAuthenticatedBefore: state => state.authentication.authenticatedBefore
    })
  }
}
</script>

<style scoped>
.hint-authenticated-before {
  color: #ccc;
  font-size: 12px;
  max-width: 500px;
}
</style>
