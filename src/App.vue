<script>
/** Show the application version in the console. */
function showAppVersion () {
  const version = process.env.VUE_APP_VERSION
  if (version) {
    console.log(`%c You are using version ${version} of the application. Enjoy! 🎈`, 'font-weight: bold;')
  }
}

export default {
  mounted () {
    showAppVersion()
  },

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
