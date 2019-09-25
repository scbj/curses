import { authenticate } from './middlewares/auth'
import Transaction from './models/Transaction'

export default {
  list: authenticate(async (req, res) => {
    const balances = await Transaction.aggregate([
      { $match: { refunded: false } },
      { $group: { _id: '$owner', owner: { $first: '$owner' }, amount: { $sum: '$amount' } } }
    ]).sort({ amount: -1 })
    return res.json(balances)
  })
}
