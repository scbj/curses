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

  update: authenticate(async (req, res) => {
    // Retreive user inputs
    const expectedFields = [ '_id', 'owner', 'description', 'amount', 'date' ]
    const params = filterParams(req.body, expectedFields)
    if (!validateParams(params, expectedFields)) {
      return res.sendStatus(400)
    }

    // An user can only edit his own transactions
    if (this.transaction.owner !== req.user.username) {
      return res.sendStatus(403)
    }

    const result = await Transaction.updateOne({ _id: params._id }, params)
    if (result.nModified === 1) {
      return res.sendStatus(204)
    }

    return res.sendStatus(202)
  }),

  list: authenticate(async (req, res) => {
    const transactions = await Transaction.find().sort({ date: -1 })
    return res.json(transactions)
  }),

  delete: authenticate(requiredRoles([ 'deleteTransaction' ], async (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
      return req.sendStatus(404)
    }
    // Retreive user inputs
    const expectedFields = [ 'id' ]
    const params = filterParams(req.body, expectedFields)
    if (!validateParams(params, expectedFields)) {
      return res.sendStatus(400)
    }
    const result = await Transaction.deleteOne({ _id: params.id })
    return res.json(result)
  })),

  drop: process.env.NODE_ENV === 'development' && authenticate(requiredRoles([ 'dropCollection' ], async (req, res) => {
    const result = await Transaction.deleteMany({})
    return res.json(result)
  }))
}
