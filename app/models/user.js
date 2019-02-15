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
},
{
  orders: []
},
{
  cart: {
    items: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        quantity: {
          type: Number,
          required: true
        }
      }
    }]
  }
})

module.exports = mongoose.model('User', userSchema)
