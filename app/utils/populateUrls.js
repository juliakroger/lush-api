const log = require('../utils/log')
const urls = [
  'bath/bath-bombs/',
  'bath/bubble-bars/',
  'bath/bath-oils/',
  'bath/kids-faves/',
  'shower/bar-soap/',
  'shower/shower-gels-jellies/',
  'shower/naked-shower-gels/',
  'shower/body-scrubs/',
  'shower/shower-bombs/',
  'shower/shaving-creams/',
  'shower/body-cleansers/',
  'shower/body-butters-conditioners/',
  'hair/shampoo-bars/',
  'hair/shampoo/',
  'hair/conditioners/',
  'hair/hair-treatments/',
  'hair/styling/',
  'hair/henna-hair-dyes/',
  'hair/pressed-conditioners/',
  'face/cleansers-scrubs/',
  'face/moisturizers/',
  'face/toners-and-steamers/',
  'face/masks/',
  'face/makeup/',
  'face/lip-scrubs-and-balms/',
  'face/teeth/',
  'face/shaving/',
  'body/body-lotions/',
  'body/massage-bars/',
  'body/handcare/',
  'body/footcare/',
  'body/shaving-creams/',
  'body/body-cleansers/',
  'body/deodorants-and-dusting-powders/',
  'gifts/gift-sets/',
  'gifts/knot-wraps/',
  'gifts/accessories/'
]
const Urls = require('../models/CrawlerUrls')

const populate = async () => {
  for (const url of urls) {
    const exits = await Urls.findOne({ url: url })

    if (!exits) {
      const newUrl = new Urls({
        url: url
      })

      await newUrl.save()
    }
  }
  log.info('Urls populated')
}

module.exports = populate
