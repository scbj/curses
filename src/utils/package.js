/** Show the application version in the console. */
export function showAppVersionInConsole () {
  const version = process.env.VUE_APP_VERSION
  if (version) {
    console.log(`%c You are using version ${version} of the application. Enjoy! 🎈`, 'font-weight: bold;')
  }
}
