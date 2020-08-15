function getData() {
  const data = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  // const NUMBER = data[Math.floor(Math.random() * data.length)]
  let Random = ''
  for (let i = 0; i < 5; i++) {
    Random += data[Math.floor(Math.random() * data.length)]
  }

  let collected = []
  if (collected.indexOf(Random) >= 0) {
    return getData()
  } else {
    collected.push(Random)
    return Random
    // console.log(Random)
    // console.log(collected)
  }
}
getData()

module.exports = getData