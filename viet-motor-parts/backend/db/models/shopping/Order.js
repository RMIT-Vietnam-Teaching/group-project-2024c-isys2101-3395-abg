const mongoose = require('mongoose');
const { valid_phone_number } = require('../../../utils/validator');

const orderSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      minLength: [5, 'Customer name must be at least 5 characters long']
    },
    phone_number: {
      type: String,
      required: true,
      validate: {
        validator: valid_phone_number,
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    address: {
      type: String,
      required: true,
      minLength: [5, 'Address must be at least 5 characters long']
    },
    total_amount: {
      type: Number,
      required: true,
      min: [0, 'Total amount must be a positive number']
    },
    order_status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipping', 'Delivered', 'Canceled'],
      default: 'Pending'
    },
    payment_method: {
      type: String,
      enum: ['Cash', 'PayPal'],
      required: true
    },
    shipping_label: {
      type: String,
      default: null
    },
    order_details: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1']
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price must be a positive number']
        }
      }
    ]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
