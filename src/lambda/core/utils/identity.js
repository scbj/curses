/**
 * Creates user object from the Netlify Identity context.
 * @param {Object} context The Netlify Identity context
 */
export function createUser (context) {
  const { user } = context
  const parse = () => ({
    email: user.email,
    username: user.user_metadata.full_name,
    roles: user.app_metadata.roles || []
  })
  return user
    ? parse()
    : null
}
