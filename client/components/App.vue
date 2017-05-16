<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
:root {
  --color-text: rgb(255, 255, 255);
  --color-artist: rgb(160, 160, 160);
  --color-bg: rgb(40, 40, 40);
  --color-separator: rgb(83, 83, 83);

  --grid-column-size: 8px;
}

body {
  background-color: #000;
  color: var(--color-text);
  margin: 0;
  font-size: 1rem;
  font-family: 'helvetica neue',
               arial,
               sans-serif;
  font-weight: 200;
}

.page {
  background-color: var(--color-bg);
  margin: 0 auto;
  max-width: 1024px;
  min-height: 100vh;
}
</style>
