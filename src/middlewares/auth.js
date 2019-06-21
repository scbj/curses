import store from '@/store'

export function requiresAuth (to, _, next) {
  const isAuthenticated = store.get('isAuthenticated')
  const isLoginView = to.name === 'login'

  /** If the route is not the login page and the user is authenticated
   * then do nothing. In the opposite case, a user who is on the login
   * page but does not authenticate must stay there. */
  if (isLoginView !== isAuthenticated) {
    return next()
  }

  return next({ name: isAuthenticated ? 'home' : 'login' })
}
