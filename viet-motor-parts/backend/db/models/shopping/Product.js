const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, 'Product name must be at least 3 characters long']
    },
    description: {
      type: String,
      required: true,
      minLength: [10, 'Description must be at least 10 characters long']
    },
    brand: {
      type: String,
      required: true,
      minLength: [2, 'Brand name must be at least 2 characters long']
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number']
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: [0, 'Stock quantity must be a non-negative number']
    },
    image_base64: {
      type: String,
      required: true
    },
    compatible_vehicles: [
      {
        make: {
          type: String,
          required: true
        },
        model: {
          type: String,
          required: true
        },
        year: {
          type: Number,
          required: true,
          min: [1900, 'Year must be a valid year']
        }
      }
    ],
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;