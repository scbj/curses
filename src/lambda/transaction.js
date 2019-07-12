import { createResponse } from './server/app'

export function handler (event, context, callback) {
  try {
    callback(null, createResponse(event, context))
  } catch (error) {
    callback(error)
  }
}
