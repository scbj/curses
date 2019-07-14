import mongoose from 'mongoose'

// Use native promises
mongoose.Promise = global.Promise

const mongoUri = process.env.MONGO_URI

try {
  mongoose.connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
} catch (error) {
  console.log('TCL: connectToDatabase -> 💥', error)
}
