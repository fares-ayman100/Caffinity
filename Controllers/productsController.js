const httpStatus = require('../Utils/httpStatus');
const Product = require('../Models/productsModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const ApiFeatures = require('../Utils/apiFeatures');

const getAllProducts = catchAsync(async (req, res, next) => {
  
  const featurse = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort();
  const products = await featurse.query;

  res.status(200).json({
    status: httpStatus.SUCCESS,
    results: products.length,
    data: products,
  });
});

const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new AppError('No product found with that ID.', 404),
    );
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: product,
  });
});

const addProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: product,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(
      new AppError('No product found with that ID.', 404),
    );
  }
  res.status(204).json(null);
});

const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    return next(
      new AppError('No product found with that ID.', 404),
    );
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: product,
  });
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
