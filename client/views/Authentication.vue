<template>
  <main>
    <div>The Authentication Dialog</div>
    <a :href="authorizationUrl" title="Click to authenticate">Authenticate</a>
  </main>
</template>

<script>
import { getAuthorizationUrl } from '../api/urls'

export default {
  computed: {
    authorizationUrl () {
      return getAuthorizationUrl('demo-demo-demo')
    }
  }
}
</script>
