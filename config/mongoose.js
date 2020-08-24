const mongoose = require('mongoose')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGOLAB_BRONZE_URI || 'mongodb://localhost/url-shortener-link'


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db