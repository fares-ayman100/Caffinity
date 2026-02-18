const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: String,
    image: String,
    price: Number,

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },

  items: [orderItemSchema],

  totalPrice: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: 'usd',
  },

  stripeSessionId: {
    type: String,
    unique: true,
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },

  orderStatus: {
    type: String,
    enum: ['processing', 'completed', 'cancelled'],
    default: 'processing',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// populate automatically
orderSchema.pre(/^find/, function () {
  this.populate({
    path: 'items.product',
    select: 'name price image',
  });
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
