const mongoose = require('mongoose')
const to = require('../utils/to')
const log = require('../utils/log')
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
    log.error(err.message)
    process.exit(1)
  }
  log.info('DB connected')
}

module.exports = connectDB
