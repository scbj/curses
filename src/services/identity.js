import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init({
  APIUrl: 'https://curses.netlify.com/.netlify/identity',

  // Allow Netlify to put its logo at the bottom of the login dialog
  logo: true
})

/**
 * Returns true if the user is connected.
 * @returns {Boolean}
 */
export function hasConnectedUser () {
  return !!netlifyIdentity.currentUser()
}

/**
 * Retreive the the JWT token of the current user or returns an empty string.
 * @returns {String}
 */
export async function getBearerToken () {
  return hasConnectedUser()
    ? netlifyIdentity.currentUser().jwt()
    : ''
}

export default netlifyIdentity
