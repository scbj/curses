import { authenticate } from './middlewares/auth'
import Transaction from './models/Transaction'

export default {
  fetch: authenticate(async (req, res) => {
    const [ result ] = await Transaction.aggregate([
      {
        $match: {
          owner: req.user.user_metadata.full_name,
          refunded: false
        }
      },
      {
        $project: {
          amount: 1
        }
      },
      {
        $group: {
          _id: null,
          amount: {
            $sum: '$amount'
          }
        }
      }
    ])
    const amount = result ? result.amount : 0

    return res.json({
      amount
    })
  })
}
