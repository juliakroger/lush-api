const sleep = require('../utils/sleep')
const log = require('../utils/log')

const browser = require('./browser')
const crawlerUrls = require('./crawlers/crawlerUrls')
const crawlerProduct = require('./crawlers/crawlerProduct')

const Urls = require('../models/CrawlerUrls')
const Products = require('../models/Products')

const processUrls = async value => {
  const { _id, url } = value

  const browseUrl = `https://www.lushusa.com/${url}`
  const data = await browser(browseUrl, crawlerUrls)

  if (data.urls && data.urls.length > 0) {
    for (const url of data.urls) {
      const exits = await Products.findOne({ url: url })

      if (!exits) {
        const newProduct = new Products({
          url: url
        })

        await newProduct.save()
      }
    }
  }

  Urls.findByIdAndUpdate(
    _id,
    {
      $set: {
        readed: true
      }
    },
    (err, value) => (err ? log.error(err) : log.info(`Updated ${url}`))
  )

  await sleep(2)
  run()
}

const processProduct = async product => {
  const { _id, url } = product

  const data = await browser(url, crawlerProduct)

  const { title, description, images, ingredients, type, options } = data

  Products.findByIdAndUpdate(
    _id,
    {
      $set: {
        title,
        description,
        images,
        ingredients,
        type,
        options,
        isPartial: false
      }
    },
    (err, value) => (err ? log.error(err) : log.info(`Updated ${title}`))
  )

  await sleep(2)
  run()
}

const run = async () => {
  const value = await Urls.findOne({ readed: false })

  if (value) {
    await processUrls(value)
  } else {
    const product = await Products.findOne({ isPartial: true })

    if (product) {
      await processProduct(product)
    } else {
      log.warn('No more update')
    }
  }
}

module.exports = run
