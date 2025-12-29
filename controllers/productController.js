const { productModel } = require("../Models/productSchema");
const { UserModel } = require("../Models/userSchema");
const getProducts = async (req, res) => {
  try {
    const data = await productModel.find();
    return res.status(400).json({
      message: "Fecthed all data",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      message: "server error",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const data = await productModel.findById(req.params.id);
    return res.status(200).json({
      message: "single product fetched",
      data: data,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Server error",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = new productModel({
      name,
      description,
      price,
      category,
      stock,
    });
    const savedProduct = await product.save();
    return res.status(201).json({
      message: "product added successfully",
      product: savedProduct,
    });
  } catch (err) {
    return res.status(401).json({
      message: err,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedData = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      message: "updated succesfully",
      data: updatedData,
    });
  } catch (err) {
    return res.status(401).json({
      message: "server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    return res.status(401).json({
      message: "Deleted Successfully",
      data: deletedProduct,
    });
  } catch (err) {
    return res.status(400).send("server error");
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
