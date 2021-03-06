const express = require('express')
const router = express.Router()
const URL = require('../../models/URL.js')

router.get('/', (req, res) => {
  res.render('index')
})




router.post('/link', (req, res) => {
  const userURL = req.body.URL
  // console.log(userURL)
  function getData() {
    const data = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

    let Random = ''
    for (let i = 0; i < 5; i++) {
      Random += data[Math.floor(Math.random() * data.length)]
    }
    return Random
  }

  // 防止有重覆的網址組合出現
  let key = getData()
  // console.log(key)
  URL.find()
    .then(items => {
      const shortUrls = []
      items.forEach(item => {
        shortUrls.push(item.key)
      })
      while (shortUrls.indexOf(key) !== -1) {
        key = getData()
      }


      let domainUrl = process.env.HEROKU_URL || 'http://localhost:3000/'

      URL.create({
        name: userURL,
        key: `${key}`
      })
        .then(item => res.render('show', { Random1: item.key, Random2: item.name, Random3: item._id, domainUrl: domainUrl }))

    })

})


router.get('/:key', (req, res) => {
  const key = req.params.key
  // console.log(req.params.key)
  URL.findOne({ key: `${key}` })
    .then(item => res.redirect(`${item.name}`))
    .catch(error => console.log(error))
})

module.exports = router
