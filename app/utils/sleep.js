const sleep = async time =>
  new Promise(resolve => {
    time = time ? time * 1000 : 1000
    setTimeout(resolve, time)
  })

module.exports = sleep
