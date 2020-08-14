const mongoose = require('mongoose')
const URL = require('../URL.js')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/url-shortener-link', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  const getData = getData()
  URL.create({
    name: 'https://www.google.com',
    key: `${getData}`

  })

  console.log('done')

})
