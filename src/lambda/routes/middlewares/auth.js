export function authenticate (next) {
  return (req, res) => {
    // All routes need to be authenticated
    const isAuthenticated = !!req.user
    if (!isAuthenticated) {
      console.log('A user was not allowed', req.user)
      return res.sendStatus(401)
    }
    return next(req, res)
  }
}

/**
 * Restrict access by only allowing users who have specified roles.
 * @param {Array<String>} roles
 * @param {Function} next
 */
export function requiredRoles (roles, next) {
  return (req, res) => {
    const userRoles = req.user.roles
    const meetsRequiredRoles = roles.every(role => userRoles.includes(role))
    return meetsRequiredRoles
      ? next(req, res)
      : res.sendStatus(403)
  }
}
