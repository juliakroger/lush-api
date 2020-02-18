const { Schema, model } = require('mongoose')

const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  likes: [{ product: Schema.Types.ObjectId, ref: 'Products' }],
  cart: [{ product: Schema.Types.ObjectId, ref: 'Products' }]
})

module.exports = User = model('Users', UsersSchema)
