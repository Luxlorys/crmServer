const productService = require("../services/productService");
const controllerlWrapper = require("../../helpers/controllerWrapper");

const getAllProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};

const getOneProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await productService.getById(productId);
  res.status(200).json(result);
};

const addProduct = async (req, res) => {
  const result = await productService.createProduct(req.body);
  res.status(201).json(result);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await productService.removeProduct(productId);
  res.json({ message: "Product deleted" });
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await productService.updateById(productId.req.body, {
    new: true,
  });
  res.json(result);
};

module.exports = {
  getAllProducts: controllerlWrapper(getAllProducts),
  getOneProduct: controllerlWrapper(getOneProduct),
  addProduct: controllerlWrapper(addProduct),
  deleteProduct: controllerlWrapper(deleteProduct),
  updateProduct: controllerlWrapper(updateProduct),
};
