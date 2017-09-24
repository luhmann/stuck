<template>
  <div class="no-network">
    We currently cannot establish a network connection. Saving tracks and receiving updates might not work.
    Please try to reconnect.
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
  .no-network {
    background-color: var(--color-warning);
    color: var(--color-dark-bg);
    padding: var(--grid-cols-1) var(--grid-cols-2);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: var(--z-index-medium);
  }
</style>
