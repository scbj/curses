import { authenticate } from './middlewares/auth'

export default {
  create (req, res) {
    return res.json({
      message: 'My happy msg ❤'
    })
  },

  async list (req, res) {
    await (function (ms) { return new Promise(resolve => setTimeout(resolve, ms)) })(2000)
    return res.status(210).json({
      message: 'Ohhhh foo'
    })
  },

  bar: authenticate((req, res) => {
    return res.json({
      message: 'Vert'
    })
  })
}
