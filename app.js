const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const PORT = 3000
const bodyParser = require('body-parser')
const URL = require('./models/URL.js')
const mongoose = require('mongoose')
const db = mongoose.connection
const routes = require('./routes')


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
app.use(express.static('public'))
app.use(routes)




app.listen(PORT, () => {
  console.log(`This app is running on ${PORT}`)
})
