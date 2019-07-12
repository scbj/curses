import { createRequest } from './messages/request'
import { createResponse } from './messages/response'
import HandlerCollection from './HandlerCollection'

export default class {
  constructor () {
    this.handlers = new HandlerCollection()
  }

  /**
 * Create response from the specified event and context.
 * @param {Object} event
 * @param {Object} context
 */
  handle (event, context) {
    const req = createRequest(event)
    const res = createResponse()

    const { method, path } = req

    try {
      const handler = this.handlers.find(method, path)
      return handler(req, res)
    } catch (error) {
      console.log('TCL: handle -> error', error)
      // res.sendStatus(404)
      res.status(404).json({ error: 'Not Found' })
    }

    const response = res.create()
    console.log('TCL: handle -> response', response)

    return response
  }

  addRoute (method, path, handler) {
    this.handlers.add(method, path, handler)
  }

  /**
   * Add an handler for method GET.
   * @param  {String} path
   * @param  {Function} handler
   */
  get (path, handler) {
    this.addRoute('GET', path, handler)
  }

  /**
   * Add an handler for method POST.
   * @param  {String} path
   * @param  {Function} handler
   */
  post (path, handler) {
    this.addRoute('POST', path, handler)
  }
}
