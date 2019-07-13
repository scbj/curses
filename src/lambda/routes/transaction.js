export default {
  create (req, res) {
    return res.json({
      message: 'My happy msg ❤'
    })
  },

  list (req, res) {
    return res.status(210).json({
      message: 'Ohhhh foo'
    })
  }
}
