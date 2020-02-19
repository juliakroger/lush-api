const { Schema, model } = require('mongoose')

const CrawlerUrlsSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  readed: {
    type: Boolean,
    default: false
  }
})

module.exports = Urls = model('Urls', CrawlerUrlsSchema)
