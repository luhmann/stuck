<template>
  <!-- <div class="container"></div> -->
  <div class="sound-animation">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.sound-animation {
  height: calc(3 * var(--grid-column-size));
  position: absolute;
  bottom: calc(1 * var(--grid-column-size));
  right: calc(2 * var(--grid-column-size));
  width: calc(2 * var(--grid-column-size));
}

.bar {
  background: #eee;
  bottom: 1px;
  height: 3px;
  position: absolute;
  width: 3px;
  animation: sound 0ms -800ms linear infinite alternate;
}

@keyframes sound {
  0% {
    opacity: .35;
    height: 3px;
  }
  100% {
    opacity: 1;
    height: 16px;
  }
}

.bar:nth-child(1) {
  left: 1px;
  animation-duration: 474ms;
}

.bar:nth-child(2) {
  left: 5px;
  animation-duration: 433ms;
}

.bar:nth-child(3) {
  left: 9px;
  animation-duration: 407ms;
}

.bar:nth-child(4) {
  left: 13px;
  animation-duration: 458ms;
}
</style>
