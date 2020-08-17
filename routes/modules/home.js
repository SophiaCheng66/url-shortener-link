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

    // 防止有重覆的網址組合出現
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

  let domainUrl = process.env.HEROKU_URL || 'http://localhost:3000/'

  // if (domainUrl !== process.env.HEROKU_URL) {
  //   domainUrl = 'http://localhost:3000/'
  // } else if (domainUrl === process.env.HEROKU_URL) {
  //   domainUrl =
  //     'https://glacial-savannah-97000.herokuapp.com/'
  // }

  URL.create({
    name: userURL,
    key: getData()
  })
    .then(item => res.render('show', { Random1: item.key, Random2: item.name, Random3: item._id, domainUrl: domainUrl }))
    .catch(error => console.log(error))
})


router.get('/web/:id', (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  URL.findById(id)
    .lean()
    .then(item => res.render('web', { web: item }))
    .catch(error => console.log(error))
})





router.get('/:key', (req, res) => {
  const key = req.params.key
  console.log(req.params.key)
  URL.findOne({ key: `${key}` })
    .then(item => res.redirect(`${item.name}`))
    .catch(error => console.log(error))
})


module.exports = router