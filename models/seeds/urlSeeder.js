
const URL = require('../../models/URL.js')
const db = require('../../config/mongoose.js')
const getData = require('../../randomData.js')

const getData1 = getData()
db.once('open', () => {
  URL.create({
    name: 'https://www.google.com',
    key: `${getData1}`

  })

  console.log('done')

})
