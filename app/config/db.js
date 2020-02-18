const mongoose = require('mongoose')
const to = require('../utils/to')
const url = require('./config')

const connectDB = async () => {
  const [err] = await to(
    mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
  )

  if (err) {
    console.log(err.message)
    process.exit(1)
  }
  console.log('DB connected')
}

module.exports = connectDB
