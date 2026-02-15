const mongoose = require('mongoose');
const Product = require('./productsModel');
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
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
  // this is point to Review model
  this.populate({
    path: 'user',
    select: 'firstName lastName',
  });

  //   .populate({
  //     path: 'product',
  //     select: 'name',
  //   })
});

reviewSchema.statics.calcAverageSchema = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  await Product.findByIdAndUpdate(productId, {
    ratingsAverage: stats[0].avgRating,
  });
};

reviewSchema.post('save', async function () {
  // this point on review document
  await this.constructor.calcAverageSchema(this.product);
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
