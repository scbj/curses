import statuses from 'statuses'

/** Create the response object. */
export function createResponse () {
  // Create the base response object with default values
  let response = {
    statusCode: 200,
    headers: {},
    body: ''
  }

  /**
   * Set the specified header.
   * @param {String} name
   */
  const setHeader = (name, value) => {
    response.headers[name] = value
  }

  return {
    /**
     * Send the specified object as JSON.
     * @param {Object} payload
     */
    json (payload) {
      setHeader('Content-Type', 'application/json')
      response.body = JSON.stringify(payload)
    },

    /**
     * Set the HTTP status code.
     * @param {Number} code
     */
    status (code) {
      response.statusCode = code
      return this
    },

    /**
     * Send an empty response with the specified HTTP status code.
     * @param {Number} code
     */
    sendStatus (code) {
      setHeader('Content-Type', 'text/html')
      response.body = statuses[code] || String(code)
      this.status(code)
    },

    /**
     * Create the AWS lambda response object.
     */
    pack () {
      console.log('TCL: pack -> response', response)
      return response
    }
  }
}
