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

// to prevent user create more than review on same product
// reviewSchema.index({ product: 1, user: 1 }, { unique: true });

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

reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: new mongoose.Types.ObjectId(productId) },
    },
    {
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
        nRating: { $sum: 1 },
      },
    },
  ]);

  // console.log(stats);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function () {
  //this.constructor === Review
  await this.constructor.calcAverageRating(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function () {
  this.r = await this.clone().findOne();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRating(this.r.product);
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
