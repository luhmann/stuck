<template>
  <div class="root">
    <app-header />
    <main>
      <section class="authentication-dialog">
        <h2 class="authentication-headline">Ever had a song stuck in your head?</h2>
        <p>
          Do you know that feeling of listening to Spotify for hours and have all those great songs just playing
          by, but you cannot be bothered to save them to your library to not disturb your flow. Did wish for a
          time-machine to save all those brialliant keepers? Well, now you have it. With STUCK you can jump back
          in your Spotify history and revisit all those great moments. Keep what you like and forget what you don't.
        </p>
        <p>
          To get started we just need permissions from you to access your Spotify library and allow us to save songs in
          your library. Do not worry all communication are strictly between you and Spotify and you can revoke
          access at any time.
        </p>
        <p class="hint-authenticated-before" v-if="userAuthenticatedBefore">
          Why do I have to authenticate again?

          Spotify only grants sessions that last an hour for their app.
          So if you last authenticated more than an hour ago, you need to authenticate again.
          It should be quick.

          Sorry for the inconvenience!
        </p>
        <a class="authentication-button" :href="authorizationUrl" title="Click to authenticate">
          Authenticate with Spotify
        </a>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAuthorizationUrl } from '../api/urls'

import AppHeader from 'components/AppHeader'

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
  },
  components: {
    AppHeader
  }
}
</script>

<style lang="postcss" scoped>


.root {
  display: grid;
  grid-template-rows: 84px 1fr;
  height: 100vh;
}

main {
  display: grid;
}


.authentication-headline {
  margin: 0;
}

.authentication-dialog {
  align-self: center;
  background-color: var(--color-bright-bg);
  color: var(--color-dark-bg);
  margin-top: -32px;
  justify-self: center;
  padding: calc(2 * var(--grid-column-size));
  max-width: 620px;
}

.hint-authenticated-before {
  color: #ccc;
  font-size: 12px;
  max-width: 500px;
}

.authentication-button {
  color: var(--color-bright-bg);
  background-color: var(--color-spotify);
  border-radius: 5px;
  display: block;
  font-weight: 400;
  padding: calc(1 * var(--grid-column-size)) calc(2 * var(--grid-column-size));
  text-align: center;
  text-decoration: none;
}
</style>
