const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const PORT = 3000
const bodyParser = require('body-parser')
const URL = require('./models/URL.js')
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/url-shortener-link', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  res.render('index')
})


app.post('/link', (req, res) => {
  const userURL = req.body.URL
  // console.log(userURL)
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

  URL.create({
    name: userURL,
    key: getData()
  })
    .then(item => res.render('show', { Random1: item.key, Random2: item.name, Random3: item._id }))
    .catch(error => console.log(error))
})




app.get('/web/:id', (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  URL.findById(id)
    .lean()
    .then(item => res.render('web', { web: item }))
    .catch(error => console.log(error))
})




app.get('/:key', (req, res) => {
  const key = req.params.key
  console.log(req.params.key)
  URL.findOne({ key: `${key}` })
    .then(item => res.redirect(`${item.name}`))
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`This app is running on ${PORT}`)
})
