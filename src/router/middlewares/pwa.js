/**
 * Returns true if the curent web app running as standalone PWA.
 * @returns {Boolean}
 */
function isRunningStandalone () {
  return window.matchMedia('(display-mode: standalone)').matches
}

/**
 * Returns a navigation guards which make sure that the app is in
 * standalone mode, else it calls next() with the specified options.
 * @param {Object | String | Boolean} options
 */
export function requiresStandaloneMode (options) {
  return (to, from, next) => {
    const isDevelopment = process.env.NODE_ENV !== 'production'
    const isCallbackRoute = to.name === options.name
    if (isDevelopment || isCallbackRoute || isRunningStandalone()) {
      return next()
    }

    return next(options)
  }
}
