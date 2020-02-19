const crawlerProduct = () => {
  const find = str => {
    const elements = document.querySelectorAll(str)

    const arr = []

    elements.forEach(item => {
      arr.push(item)
    })

    return arr
  }

  const populate = (item, propName, query, fn) => {
    const pure = query.indexOf('|') === 0
    const result = find(query.replace('|', ''))

    if (!result[0]) {
      return item
    }
    const value = fn(pure ? result[0] : result[0].innerText)

    if (value !== null) {
      item[propName] = value
    }

    return item
  }

  const populateArray = (item, propName, query, fn) => {
    const pure = query.indexOf('|') === 0
    const result = find(query.replace('|', ''))
    item[propName] = result.map(item => fn(pure ? item : item.innerText))

    return item
  }

  const item = {}

  populate(item, 'title', '.product-name', result => result)
  populate(item, 'description', '.content', result => result)
  populateArray(
    item,
    'images',
    '|.swiper-wrapper > div > img',
    result => result.src
  )
  populateArray(
    item,
    'ingredients',
    '|.product-ingredients-list > span > a',
    result => result.title
  )

  populateArray(item, 'type', '|.badging  > .badge-container', result =>
    result.innerText.trim()
  )

  populateArray(
    item,
    'options_values',
    '|.select-size > div > button > .size-value > .name-price',
    result => result.innerText
  )

  item.options = item.options_values.map(value => {
    const values = value.split('\n')
    return {
      price: parseFloat(values[0].replace('$', '')),
      amount: values[1].trim(),
      promotionPrice: 0
    }
  })

  item.images = item.images.slice(0, 2)

  delete item.options_values

  return item
}

module.exports = crawlerProduct
