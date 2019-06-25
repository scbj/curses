function initializeDefaultAttributes () {
  this.status(200)
  this.headers = {}
  this.body = {}
}

export default class {
  constructor () {
    initializeDefaultAttributes.call(this)
  }

  /**
   * Set the HTTP status code.
   * @param {Number} code
   */
  status (code) {
    this.statusCode = code
    return this
  }

  /**
   * Send an empty response with the specified HTTP status code.
   * @param {Number} code
   */
  sendStatus (code) {
    this.status(code)
  }

  /**
   * Send the specified object as JSON.
   * @param {Object} payload
   */
  json (payload) {
    this.headers['Content-Type'] = 'application/json'
    this.body = JSON.stringify(payload)
  }

  /**
   * Create the AWS lambda response object.
   */
  create () {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: this.body
    }
  }
}
