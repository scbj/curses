/**
   * Returns the specified HTTP request header field (case-insensitive match).
   * @param {Array} headers The header array
   * @param {String} field The HTTP header name
   */
function get (headers, field) {
  return headers && headers[field && field.toLowerCase()]
}

/** Defines the request headers and use X-Forwarded headers to populate attributes. */
function useForwardedHeaders ({ headers }) {
  return {
    headers,
    hostname: get(headers, 'X-Forwarded-Host'),
    ip: get(headers, 'X-Forwarded-For'),
    protocol: get(headers, 'X-Forwarded-Proto')
  }
}

/** Use payloads passed through the body and the query parameters. */
function usePayload ({ headers, body, queryStringParameters }) {
  return {
    body: get(headers, 'Content-Type') || {},
    query: queryStringParameters || {}
  }
}

export function createRequest (event) {
  const { httpMethod, path, headers } = event

  const options = {
    ...useForwardedHeaders(event),
    ...usePayload(event),
    path,
    method: httpMethod
  }

  return {
    ...options,

    /**
     * Returns the specified HTTP request header field (case-insensitive match).
     * @param {String} field The HTTP header name
     */
    get (field) {
      return get(headers, field)
    }
  }
}
