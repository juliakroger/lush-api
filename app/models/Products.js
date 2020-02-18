const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  onPromotion: Boolean,
  scent: [String],
  mood: [String],
  benefit: [String],
  type: [String],
  ingredients: [String],
  rate: { type: Number, default: 0 },
  reviews: [
    {
      title: { type: String, required: true },
      name: String,
      date: Date,
      description: String,
      rate: {
        type: Number,
        min: 0,
        max: 5
      }
    }
  ],
  options: [
    {
      price: Number,
      promotionPrice: Number,
      amount: String
    }
  ]
})

module.exports = Product = mongoose.model('Products', ProductsSchema)
