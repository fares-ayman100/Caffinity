const fs = require('fs');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.DATABASE;

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8'),
);
const Product = require('../Models/productsModel');
const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data loaded Successfuly');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data deleted Successfuly');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

mongoose.connect(DB).then(async () => {
  console.log('Database Connection Successfuly');

  if (process.argv[2] === '--import') {
    await importData();
  } else if (process.argv[2] === '--delete') {
    await deleteData();
  }
});

console.log(process.argv);
