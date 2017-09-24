<template>
  <main class="error-bg">
    <div class="error-msg">
      <svgicon class="error-icon" v-if="!isNetworkError" icon="error" height="40" width="40" />
      <svgicon class="error-icon" v-if="isNetworkError" icon="nonetwork" height="40" width="40" />
      {{ errorMessage }}
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  UI_ERROR_DEFAULT,
  UI_ERROR_NETWORK,
  UI_ERROR_RATE_LIMIT,
  UI_ERROR_SPOTIFY_DOWN
} from '../store/ui-store'

const defaultErrorMessage = `
  Oh no, something went wrong. We are sorry for that. It might be a temporary issue, please try again later
`

const spotifyDownErrorMessage = `
  Oh no, we could establish a successful connection with Spotify.
  This might be a temporary issue, please try again later.
`

const rateLimitErrorMessage = `
  Oh no, we have sent too many requests to Spotify and they have temporarily restricted our access.
  This is a common measure in order to ensure a good experience for everyone.
  This is a temporary problem however. Please try again later.
`

const networkDownErrorMessage = `
  We could not establish a network connection. Please connect to a network and retry.
`

const errorMessageMap = new Map([
  [UI_ERROR_DEFAULT, defaultErrorMessage],
  [UI_ERROR_RATE_LIMIT, rateLimitErrorMessage],
  [UI_ERROR_SPOTIFY_DOWN, spotifyDownErrorMessage],
  [UI_ERROR_NETWORK, networkDownErrorMessage],
])

export default {
  computed: {
    ...mapGetters(['errorDetails']),
    errorMessage() {
      try {
        return errorMessageMap.get(this.errorDetails.type) || defaultErrorMessage
      } catch (err) {
        return defaultErrorMessage
      }
    },
    isNetworkError() {
      return this.errorDetails.type === UI_ERROR_NETWORK
    }
  }
}
</script>

<style lang="postcss" scoped>
.error-bg {
  align-items: center;
  background: linear-gradient(to bottom, #ea384d, #d31027);
  display: flex;
  justify-content: center;
  height: calc(100vh - 72px);
  max-width: var(--mq-max);
  width: 100vw;
}

.error-icon {
  display: block;
  margin: 0 auto var(--grid-cols-1);
}

.error-msg {
  color: var(--color-text);
  font-family: monospace;
  margin-top: calc(-1 * 2 * var(--grid-column-size));
  max-width: 450px;
  text-align: center;
  width: 80vw;
}
</style>
