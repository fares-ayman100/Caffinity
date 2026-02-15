const catchAsync = require('../Utils/catchAsync');
const httpStatus = require('../Utils/httpStatus');
const ApiFeatures = require('../Utils/apiFeatures');
const AppError = require('../Utils/appError');

const getAllDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    // this 2 line for Nested Get Reviews
    let filter = {};
    if (req.params.productId)
      filter = { product: req.params.productId };
    const featurse = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort();
    const doc = await featurse.query;

    res.status(200).json({
      status: httpStatus.SUCCESS,
      results: doc.length,
      data: doc,
    });
  });

const getDoc = (Model, populateOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOption) query = query.populate(populateOption);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError('No document found with that ID.', 404),
      );
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: doc,
    });
  });

const createDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: httpStatus.SUCCESS,
      data: doc,
    });
  });

const updateDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doc) {
      return next(
        new AppError('No document found with that ID.', 404),
      );
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: {
        data: doc,
      },
    });
  });

const deleteDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError('No document found with that ID.', 404),
      );
    }
    res.status(204).json(null);
  });

module.exports = {
  getAllDoc,
  getDoc,
  createDoc,
  updateDoc,
  deleteDoc,
};
