// review / rating / created at / ref to tour / ref to user

const mongoose = require('mongoose');
const { path } = require('../app');
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'rating must be above 1'],
    max: [5, 'rating must be under 5'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Review must belong to a product'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
});

reviewSchema.pre(/^find/, function () {
  this.populate({
    path: 'product',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'firstName lastName',
  });
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
