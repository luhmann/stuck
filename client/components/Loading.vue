<template>
  <div class="root" :class="{ open: isOpen}">
    <div class="background-image"></div>
    <svg class="svg-center" width="200" height="200">
      <path class="path-center" d="M 100 100 m -100 0 a 100 100 0 1 0 200 0 a 100 100 0 1 0 -200 0" />
    </svg>
    <svg class="svg-borders" width="10000" height="5000">
      <path class="path-borders" d="M 5000 2500 m -174 0 a 174 174 0 1 0 348 0 a 174 174 0 1 0 -348 0" />
      <path class="path-borders" d="M 5000 2500 m -323 0 a 323 323 0 1 0 646 0 a 323 323 0 1 0 -646 0" />
      <path class="path-borders" d="M 5000 2500 m -472 0 a 472 472 0 1 0 944 0 a 472 472 0 1 0 -944 0" />
      <path class="path-borders" d="M 5000 2500 m -621 0 a 621 621 0 1 0 1242 0 a 621 621 0 1 0 -1242 0" />
      <path class="path-borders" d="M 5000 2500 m -770 0 a 770 770 0 1 0 1540 0 a 770 770 0 1 0 -1540 0" />
    </svg>
  </body>
  </html>

  </div>
</template>

<script>
let interval;

export default {
  mounted() {
    const toggle = () => this.isOpen = !this.isOpen;

    interval = window.setInterval(toggle, 2000);
  },
  destroyed() {
    window.clearInterval(interval);
  },
  data() {
    return {
      isOpen: true
    }
  }
}
</script>

<style scoped>

/* Background image */
.root {
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100vh;
  background-image: url('/loading-background.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transform: scale(1.5);
}

svg {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.svg-center {
  border-radius: 100%;
}

path {
  fill: none;
  stroke: black;
  stroke-width: 150px;
}

path.path-center {
  stroke-width: 200px;
}

.background-image,
.svg-borders,
.path-center,
.path-borders {
  transition: 2s cubic-bezier(0.77, 0, 0.175, 1);
}


.open .background-image {
  transform: scale(1);
}

.open .svg-borders {
  transform: translate(-50%, -50%) rotate(90deg);
}

.open .path-center {
  stroke-width: 400px;
}


.path-borders:nth-child(6) {
  stroke-dashoffset: 10000;
  stroke-dasharray: 10000 0 5827.5;
}

.open .path-borders:nth-child(6) {
  stroke-dasharray: 10000 0 0;
}

.path-borders:nth-child(5) {
  stroke-dashoffset: 10000;
  stroke-dasharray: 10000 0 4882.5;
}

.open .path-borders:nth-child(5) {
  stroke-dasharray: 10000 4882.5 4882.5;
}

.path-borders:nth-child(4) {
  stroke-dashoffset: 10000;
  stroke-dasharray: 10000 0 3937.5;
}

.open .path-borders:nth-child(4) {
  stroke-dasharray: 10000 0 0;
}

.path-borders:nth-child(3) {
  stroke-dashoffset: 10000;
  stroke-dasharray: 10000 0 2992.5;
}

.open .path-borders:nth-child(3) {
  stroke-dasharray: 10000 2992.5 2992.5;
}

.path-borders:nth-child(2) {
  stroke-dashoffset: 10000;
  stroke-dasharray: 10000 0 2047.5;
}

.open .path-borders:nth-child(2) {
  stroke-dasharray: 10000 0 0;
}

.path-borders:nth-child(1) {
  stroke-dashoffset: 10000;
  stroke-dasharray: 10000 0 1102.5;
}

.open .path-borders:nth-child(1) {
  stroke-dasharray: 10000 1102.5 1102.5;
}
</style>
