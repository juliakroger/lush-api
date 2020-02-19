const puppeteer = require('puppeteer')

const run = async (url, fn) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--lang=en-us']
  })

  const page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('request', request => {
    if (
      ['image', 'stylesheet', 'font', 'xhr', 'script', 'other'].includes(
        request.resourceType()
      )
    ) {
      request.abort()
    } else {
      request.continue()
    }
  })

  await page.goto(url)

  const result = await page.evaluate(fn)

  await browser.close()

  return result
}

module.exports = run
