import { createResponse } from './server/app'

export function handler (event, context, callback) {
  try {
    const response = createResponse(event, context)
    callback(null, response)
  } catch (error) {
    callback(error)
  }
}
