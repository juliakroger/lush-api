const to = async promise =>
  promise.then(res => [undefined, res]).catch(err => [err, undefined])

module.exports = to
