/** Defines the request headers and use X-Forwarded headers to populate attributes. */
function useHeaders ({ headers }) {
  this.headers = headers
  this.hostname = this.get('X-Forwarded-Host')
  this.ip = this.get('X-Forwarded-For')
  this.protocol = this.get('X-Forwarded-Proto')
}

/** Use payloads passed through the body and the query parameters. */
function usePayload ({ headers, body, queryStringParameters }) {
  const contentType = 'content-type'
  const hasBody = contentType in headers
  const isJson = hasBody && headers[contentType] === 'application/json'

  this.body = hasBody && isJson
    ? JSON.parse(body)
    : {}
  this.query = queryStringParameters || {}
}

export default class {
  constructor (event, context) {
    const { httpMethod, path } = event

    useHeaders.call(this, event)
    usePayload.call(this, event)

    this.method = httpMethod
    this.path = path
  }

  /**
   * Returns the specified HTTP request header field (case-insensitive match).
   * @param {String} field The HTTP header name
   */
  get (field) {
    return this.headers[field && field.toLowerCase()]
  }
}
