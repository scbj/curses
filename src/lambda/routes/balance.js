import { authenticate } from './middlewares/auth'
import Transaction from './models/Transaction'

export default {
  fetch: authenticate(async (req, res) => {
    const conditionStep = { $match: {
      owner: req.user.user_metadata.full_name,
      refunded: false
    } }
    const groupStep = {
      $group: {
        _id: null,
        amount: {
          $sum: '$amount'
        }
      }
    }
    const [ { amount } ] = await Transaction.aggregate([
      conditionStep,
      groupStep
    ])

    return res.json({
      amount
    })
  })
}
