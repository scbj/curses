import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  refunded: {
    type: Boolean,
    default: false
  }
})

const TransactionModel = mongoose.model('Transaction', TransactionSchema)

export default TransactionModel
