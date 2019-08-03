<script>
export default {
  render (h) {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/fonts.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  color: var(--text-color);
  background: var(--background-color);
  font-family: 'TT Commons';
}
</style>
