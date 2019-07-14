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
      {
        $project: {
          amount: 1
        }
      },
      groupStep
    ])

    return res.json({
      amount
    })
  })
}
