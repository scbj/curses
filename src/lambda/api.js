import routes from './routes'

import { createRequest } from './core/request'
import { createResponse } from './core/response'

function handle (event, context) {
  const req = createRequest(event)
  const action = req.getHeader('Controller-Action')
  const [ controller, func ] = action.split('.')

  const res = createResponse()
  if (controller in routes && func in routes[controller]) {
    const handler = routes[controller][func]
    handler(req, res)
  } else {
    res.sendStatus(404)
  }
  const response = res.pack()
  console.log('TCL: handle -> response', response)
  return response
}

export function handler (event, context, callback) {
  try {
    callback(null, handle(event, context))
  } catch (error) {
    callback(error)
  }
}
