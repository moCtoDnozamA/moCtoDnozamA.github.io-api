/**
 * @Author: xiaojiezhang
 * @Date:   2019-02-15T11:18:04-05:00
 * @Last modified by:   xiaojiezhang
 * @Last modified time: 2019-02-15T11:33:51-05:00
 */
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
