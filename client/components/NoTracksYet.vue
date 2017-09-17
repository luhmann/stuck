<template>
  <main class="empty">
    <div class="empty-msg">
      <svgicon class="empty-icon" icon="confused" width="60" height="60" />
      Spotify says that you haven't listened to any tracks yet. Can it be? Go and get some tracks stuck in your mind.
      Then return to see them appear right here.
    </div>

  </main>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>

.empty {
  align-items: center;
  background: linear-gradient(to bottom, #1DB954, #191414);
  display: flex;
  justify-content: center;
  height: calc(100vh - 72px);
  max-width: var(--mq-max);
  width: 100vw;
}

.empty-icon {
  display: block;
  margin: 0 auto var(--grid-cols-2);
}

.empty-msg {
  color: var(--color-text);
  line-height: 1.4;
  margin-top: calc(-1 * var(--grid-cols-3));
  max-width: 450px;
  text-align: center;
  width: 80vw;
}

</style>
