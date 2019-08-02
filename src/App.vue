<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/base.scss';
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/fonts.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: var(--background-color);
}
</style>
