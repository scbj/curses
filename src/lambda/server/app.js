import Router from '../core/Router'

const app = new Router()

app.get('/transaction', (req, res) => {
  return res.status(201).json({
    message: 'yo'
  })
})

app.post('/transaction', (req, res) => {
  return res.sendStatus(204)
})

export function createResponse (event, context) {
  return app.handle(event, context)
}
