// Mongoose Import
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    subImages: {
      type: Array,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
