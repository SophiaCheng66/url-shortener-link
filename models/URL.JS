const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({

  name: {
    type: String
  },

  key: {
    type: String
  }


})


module.exports = mongoose.model('URL', urlSchema)