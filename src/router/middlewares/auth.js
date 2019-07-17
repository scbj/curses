import store from '@/store'
import { publicRoutesNames } from '@/router/routes'

export function requiresAuth (to, _, next) {
  const isAuthenticated = store.get('isAuthenticated')
  const isPublicRoute = publicRoutesNames.includes(to.name)

  /** If the route is not the login page and the user is authenticated
   * then do nothing. In the opposite case, a user who is on the login
   * page but does not authenticate must stay there. */
  if (isPublicRoute || isAuthenticated) {
    return next()
  }

  return next({ name: 'login' })
}
