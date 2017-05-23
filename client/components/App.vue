<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<style lang="postcss">
:root {
  --color-text: rgb(255, 255, 255);
  --color-artist: rgb(160, 160, 160);
  --color-bg: rgb(40, 40, 40);
  --color-dark-bg: rgb(25, 25, 25);
  --color-separator: rgb(83, 83, 83);
  --color-spotify: rgb(30, 215, 96);
  --color-bright-bg: rgb(249, 249, 249);

  --font-size-standard: 12px;
  --font-size-small: 10px;

  --grid-column-size: 8px;
  --grid-cols-1: calc(1 * var(--grid-column-size));
  --grid-cols-2: calc(2 * var(--grid-column-size));
  --grid-cols-3: calc(3 * var(--grid-column-size));

  --mq-tablet: 768px;

  --z-index-low: 1;
  --z-index-medium: 10;
}


html[data-whatinput="mouse"] :focus {
    outline: none;
}

body {
  background-color: #000;
  box-sizing: border-box;
  color: var(--color-text);
  margin: 0;
  font-size: var(--font-size-standard);
  font-family: 'helvetica neue',
               arial,
               sans-serif;
  // font-weight: 200;
}

.page {
  background-color: var(--color-bg);
  margin: 0 auto;
  max-width: 1024px;
  min-height: 100vh;
}
</style>
