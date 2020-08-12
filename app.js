const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const PORT = 3000
const bodyParser = require('body-parser')
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

  function getData() {
    const data = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmno pqrstuvwxyz1234567890"
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

  res.render('show', { Random: getData() })
})


app.listen(PORT, () => {
  console.log(`This app is running on ${PORT}`)
})
