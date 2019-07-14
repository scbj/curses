import './core/database'
import routes from './routes'

import { createRequest } from './core/request'
import { createResponse } from './core/response'

async function handle (event, context) {
  // Create request object to easily access request informations from event object
  const req = createRequest(event, context)

  // Retreive the controller action requested
  const action = req.getHeader('Controller-Action')

  // Example: 'transaction.create' -> [ 'transaction', 'created' ]
  const [ controller, func ] = action.split('.')

  // Initialize the response
  const res = createResponse()

  if (controller in routes && func in routes[controller]) {
    // Retreive handler and call it with the created request & repsonse
    const handler = routes[controller][func]
    await handler(req, res)
  } else {
    // Route doesn't exist, send Not Found to the client
    res.sendStatus(404)
  }

  // Convert response object to AWS Lambda compatible response
  return res.pack()
}

export async function handler (event, context) {
  // Enable async handler
  context.callbackWaitsForEmptyEventLoop = false

  try {
    return await handle(event, context)
  } catch (error) {
    console.log('TCL: handler -> error', error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}
