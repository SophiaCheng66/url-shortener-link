const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const URL = require('./models/URL.js')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose.js')



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)




app.listen(PORT, () => {
  console.log(`This app is running on ${PORT}`)
})
