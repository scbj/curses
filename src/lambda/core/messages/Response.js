/**
 * Set the specified header.
 * @param {Object} param0
 * @param {String} headerName
 * @param {String} value
 */
function setHeader ({ headers }, headerName, value) {
  return {
    ...headers,
    [headerName]: value
  }
}

function sendJson (options, payload) {
  return {
    ...options,
    headers: setHeader(options, 'Content-Type', 'application/json'),
    body: JSON.stringify(payload)
  }
}

function getDefaultAttributes () {
  return {
    statusCode: 200,
    headers: {},
    body: {}
  }
}

export function createResponse () {
  let options = getDefaultAttributes()

  return {
    ...options,

    /**
     * Send the specified object as JSON.
     * @param {Object} payload
     */
    json (payload) {
      options = sendJson(options, payload)
      return options
    },

    /**
     * Set the HTTP status code.
     * @param {Number} code
     */
    status (code) {
      options.statusCode = code
      return this
    },

    /**
     * Send an empty response with the specified HTTP status code.
     * @param {Number} code
     */
    sendStatus (code) {
      this.status(code)
    },

    /**
     * Create the AWS lambda response object.
     */
    create () {
      return options
    }

  }
}
