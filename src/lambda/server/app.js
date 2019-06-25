import Router from '../core/Router'

export function createResponse (event, context) {
  const app = new Router()

  app.get('/transaction', (req, res) => {
    return res.status(201).json({
      message: 'yo'
    })
  })

  app.post('/transaction', (req, res) => {
    return res.sendStatus(204)
  })
  return app.handle(event, context)
}
