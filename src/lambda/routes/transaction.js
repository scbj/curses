import { authenticate, requiredRoles } from './middlewares/auth'
import Transaction from './models/Transaction'

/**
 * Returns the object given as parameter with only the desired attributes in the options.
 * @param {*} params The original object
 * @param {*} options The desired attributes
 * @returns {Object}
 */
function filterParams (params, options) {
  const filtered = {}
  for (const key in params) {
    if (options.indexOf(key) > -1) {
      filtered[key] = params[key]
    }
  }
  return filtered
}

/**
 * Returns true if all the expected params exists.
 * @param {Object} params
 * @param {Array} options
 * @returns {Boolean}
 */
function validateParams (params, options = []) {
  const keys = Object.keys(params)
  return options.every(opt => keys.indexOf(opt) !== -1)
}

export default {
  create: authenticate(async (req, res) => {
    // Retreive user inputs
    const expectedFields = [ 'description', 'amount', 'date' ]
    const params = filterParams(req.body, expectedFields)
    if (!validateParams(params, expectedFields)) {
      return res.sendStatus(400)
    }

    Object.assign(params, {
      date: new Date(params.date),
      owner: req.user.username
    })

    // Create a Transaction from the specified params
    const transaction = new Transaction(params)

    // Save it to MongoDB
    await transaction.save()
    console.log(`🐣 Transaction created. { id: ${transaction._id}}`)

    // Send the saved transaction
    return res.status(201).json(transaction)
  }),

  list: authenticate(async (req, res) => {
    const transactions = await Transaction.find().sort({ date: -1 })
    return res.json(transactions)
  }),

  drop: authenticate(requiredRoles([ 'dropCollection' ], async (req, res) => {
    const result = await Transaction.deleteMany({})
    return res.json(result)
  }))
}
