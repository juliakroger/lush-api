const crawlerUrls = () => {
  const find = str => {
    const elements = document.querySelectorAll(str)

    const arr = []

    elements.forEach(item => {
      arr.push(item)
    })

    return arr
  }

  const populateArray = (item, propName, query, fn) => {
    const pure = query.indexOf('|') === 0
    const result = find(query.replace('|', ''))
    item[propName] = result.map(item => fn(pure ? item : item.innerText))

    return item
  }

  const item = {}

  populateArray(
    item,
    'urls',
    '|.product-tile-image-container > a',
    result => result.href
  )

  return item
}

module.exports = crawlerUrls
