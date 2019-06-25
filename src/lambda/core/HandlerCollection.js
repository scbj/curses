/**
 * Checks if the specified method exists in the handlers, if not then it will be created.
 * @param {Object} handlers
 * @param {String} method
 */
function enableMethod (handlers, method) {
  const exists = method in handlers
  if (!exists) {
    handlers[method] = {}
  }
}

export default class {
  constructor () {
    this.handlers = {}
  }

  /**
   * Add the specified handler for the route defined by the specified method and path.
   * @param {String} method The HTTP method of the request
   * @param {String} path The HTTP path of the request
   * @param {Function} handler The function that must be executed when a request match with the specified method and path.
   */
  add (method, path, handler) {
    enableMethod(this.handlers, method)

    this.handlers[method][path] = handler
  }

  /**
   * Finds and returns the handler for the specified method and path or returns undefined.
   * @param {String} method The HTTP method of the request
   * @param {String} path The HTTP path of the request
   */
  find (method, path) {
    return this.handlers[method] && this.handlers[method][path]
  }
}
