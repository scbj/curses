import Request from './messages/Request'
import Response from './messages/Response'
import HandlerCollection from './HandlerCollection'

export default class {
  constructor () {
    try {
      this.handlers = new HandlerCollection()
    } catch (error) {
      console.log('TCL: constructor -> error', error)
    }
    console.log('TCL: constructor -> this.handlers', this.handlers)
  }

  /**
 * Create response from the specified event and context.
 * @param {Object} event
 * @param {Object} context
 */
  handle (event, context) {
    const req = new Request(event, context)
    const res = new Response()

    const { method, path } = req

    try {
      console.log('TCL: handle -> this.handlers', this.handlers)
      const handler = this.handlers.find(method, path)
      handler(req, res)
    } catch (error) {
      console.log(error)
      // res.sendStatus(404)
      res.status(404).json({ error: 'Not Found' })
    }

    return res.create()
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
