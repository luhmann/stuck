<template>
  <div class="root">
    <app-header />
    <main>
      <section class="headlines">
        <h2 class="headline">Remember that tune?</h2>
        <h3 class="subheadline">Recover the awesome tracks Spotify recommended but you failed to save.</h3>
        <a class="authentication-button" :href="authorizationUrl" title="Click to authenticate">
          Authenticate with Spotify
        </a>
      </section>
      <section class="dialog">
        <p>
          Do you know that feeling of listening to Spotify for hours and have all those great songs just playing
          by, but you cannot be bothered to save them to your library to not disturb your flow. Now you can jump back
          in your Spotify history and revisit all those great moments. Keep what you like and forget what you don't.
        </p>
        <p>
          To get started you need to authenticate with Spotify and allow us:
          <ul>
            <li>
               to access your Spotify library so we can retrieve your recently played songs and determine which ones
               you already saved
            </li>
            <li>to save songs for you.</li>
          </ul>
          Don't worry all communication is strictly between you and Spotify and you can revoke access at any time.
        </p>

        <p class="hint-authenticated-before" v-if="userAuthenticatedBefore">
          Why do I see this again?

          Spotify only grants sessions that last an hour for their app.
          So if you last authenticated more than an hour ago, you need to authenticate again.
          It should be quick.

          Sorry for the inconvenience!
        </p>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAuthorizationUrl } from '../api/urls'
import { APP_NAME } from '../lib/env'

import AppHeader from 'components/AppHeader'

export default {
  created () {
    if (this.userAuthenticatedBefore) {
      window.location.replace(this.authorizationUrl)
    }
  },
  computed: {
    authorizationUrl () {
      return getAuthorizationUrl(APP_NAME)
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
  min-height: 100vh;
}

main {
  background-color: var(--color-text);
  color: var(--color-dark-bg);
  min-height: calc(100vh - 86px);
  max-width: var(--mq-max);
}

.headlines {
  background: linear-gradient(to bottom, #5A3662, #FA5B75);
  padding: calc(2 * var(--grid-column-size));

  @media(--max) {
    padding: calc(4 * var(--grid-column-size));
  }
}

.headline {
  color: var(--color-text);
  font-size: 16vw;
  line-height: 15vw;
  margin: 0;

  @media(--max) {
    font-size: calc(22 * var(--grid-column-size));
    line-height: calc(21 * var(--grid-column-size));
  }
}

.subheadline {
  color: var(--color-text);
  font-size: 6vw;
  font-weight: 400;
  line-height: 7vw;
  margin: calc(var(--grid-cols-2) + 0.5vw) 0 calc(var(--grid-cols-3) + 0.5vw);

  @media(--max) {
    font-size: calc(8 * var(--grid-column-size));
    line-height: calc(8.5 * var(--grid-column-size));
  }
}

.dialog {
  color: var(--color-dark-bg);
  font-size: calc(12px + 0.5vw);
  line-height: 1.4;
  padding: calc(2 * var(--grid-column-size));
  margin: 0 auto;
  max-width: 620px;
}

.hint-authenticated-before {
  font-size: 12px;
  max-width: 500px;
}

.authentication-button {
  color: var(--color-bright-bg);
  background-color: var(--color-spotify);
  border-radius: 50px;
  display: block;
  padding: calc(2.5 * var(--grid-column-size)) calc(2 * var(--grid-column-size));
  text-align: center;
  text-decoration: none;
  margin: 1em 0;
  font-family: inherit;
  font-weight: 700;
  font-size: calc(.875rem + 0.5vw);
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0;
}
</style>
