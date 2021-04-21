const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    foodItems: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    underConfirmation: {
      type: Boolean,
      default: true,
    },
    isConfirmed: {
      type: Boolean,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isReady: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    readyAt: {
      type: Date,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model('Order', orderSchema);
