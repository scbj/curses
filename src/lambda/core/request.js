import { createUser } from './utils/identity'

/**
 * Create a request object from the event object pass to function handler.
 * @param {Object} event The AWS Lambda event object
 */
export function createRequest (event, context) {
  const {
    body,
    headers,
    httpMethod,
    path,
    queryStringParameters
  } = event

  const { clientContext } = context
  const user = createUser(clientContext)

  /**
   * Returns the specified HTTP request header field (case-insensitive match).
   * @param {String} field The HTTP header name
   */
  const getHeader = (field) => {
    return headers && headers[field && field.toLowerCase()]
  }

  /** Defines the request headers and use X-Forwarded headers to populate attributes. */
  const useForwardedHeaders = () => {
    return {
      hostname: getHeader('X-Forwarded-Host'),
      ip: getHeader('X-Forwarded-For'),
      protocol: getHeader('X-Forwarded-Proto')
    }
  }

  /** Use payloads passed through the body and the query parameters. */
  const usePayload = () => {
    const isJson = getHeader('Content-Type') === 'application/json'
    return {
      body: body && isJson ? JSON.parse(body) : {},
      query: queryStringParameters || {}
    }
  }

  return {
    ...useForwardedHeaders(),
    ...usePayload(),

    headers,
    path,
    method: httpMethod,
    user,

    // Functions :
    getHeader
  }
}
