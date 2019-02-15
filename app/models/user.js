/**
 * @Author: xiaojiezhang
 * @Date:   2019-02-15T10:59:52-05:00
 * @Last modified by:   xiaojiezhang
 * @Last modified time: 2019-02-15T13:07:30-05:00
 */



const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
