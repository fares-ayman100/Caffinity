const Product = require('../Models/productsModel');
const factory = require('./handelrFactory');

const getAllProducts = factory.getAllDoc(Product);
const getProduct = factory.getDoc(Product, { path: 'reviews' });
const createProduct = factory.createDoc(Product);
const updateProduct = factory.updateDoc(Product);
const deleteProduct = factory.deleteDoc(Product);

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
