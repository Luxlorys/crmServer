const mongoose = require("mongoose");
const Product = require("../models/Product");

const getProducts = async () => {
  return Product.find();
};
const getById = async (productId) => {
  const result = await Product.findById(productId);

  if (!result) {
    throw { status: 404, message: "Not found" };
  }
  return result;
};
const createProduct = async (payload) => {
  return Product.create(payload);
};
const removeProduct = async (productId) => {
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw { status: 404, message: "Not found" };
  }
  return result;
};

const updateById = async (productId, payload) => {
  const result = await Product.findByIdAndUpdate(productId, payload);
  if (!result) {
    throw { status: 404, message: "Not found" };
  }
  return result;
};
module.exports = {
  getProducts,
  getById,
  createProduct,
  removeProduct,
  updateById,
};
