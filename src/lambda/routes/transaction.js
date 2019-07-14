import { authenticate } from './middlewares/auth'
import Transaction from './models/Transaction'

/**
 * Returns the object given as parameter with only the desired attributes in the options.
 * @param {*} params The original object
 * @param {*} options The desired attributes
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

export default {
  create: authenticate(async (req, res) => {
    // Retreive user inputs
    const expectedFields = [ 'description', 'amount', 'owner' ]
    const params = filterParams(req.body, expectedFields)
    params.date = new Date()

    // Create a Transaction from the specified params
    const transaction = new Transaction(params)

    // Save it to MongoDB
    await transaction.save()
    console.log(`🐣 Transaction created. { id: ${transaction._id}}`)

    // Send the saved transaction
    return res.status(201).json(transaction)
  }),

  list: authenticate(async (req, res) => {
    const transactions = await Transaction.find()
    return res.json(transactions)
  })
}
