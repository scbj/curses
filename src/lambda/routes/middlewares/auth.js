export function authenticate (next) {
  return (req, res) => {
    // All routes need to be authenticated
    const isAuthenticated = !!req.user
    if (!isAuthenticated) {
      return res.sendStatus(403)
    }
    next(req, res)
  }
}
