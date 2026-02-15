const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [
        10,
        'description must have more or equal then 10 characters',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    category: {
      type: String,
      required: [true, 'Product must be belong to category'],
      enum: [
        'Hot Drinks',

        'Cold Drinks',

        'Fresh Juices',

        'Smoothies',

        'Milkshakes',

        'Specialty Drinks',

        'Energy Drinks',
      ],
    },
    image: {
      type: String,
      default: 'default.jpg',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

// This index to improve the performance
productSchema.index({ price: 1, ratingsAverage: 1 });
productSchema.index({ slug: 1 });

productSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true });
});

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
