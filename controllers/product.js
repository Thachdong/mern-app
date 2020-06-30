// const { mutipleFilesUpload } = require("../utils/cloudinaryUpload");
const Product = require("../models/product");

const add = async (req, res, next) => {
  const { name, disc, price, stock, image } = req.body;
  const product = await Product.findOne({ name });
  if (product) {
    return res.status(400).json({
      Error: {
        message: "Product exist! Please switch to update route",
        data: { product },
      },
    });
  }
  // const cloudinaryUrls = await mutipleFilesUpload(req);
  const newProduct = new Product({
    name,
    disc,
    price,
    stock,
    image,
  });
  await newProduct.save();
  return res.status(201).json({
    Success: {
      message: "Product added",
      data: newProduct,
    },
  });
};

const getAll = async (req, res, next) => {
  const productsList = await Product.find({});
  return res.status(200).json({
    Success: {
      message: "Success",
      data: productsList,
    },
  });
};

const getById = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      Error: {
        message: "Product not found",
        data: { productId },
      },
    });
  }
  return res.status(200).json({
    Success: {
      message: "Success",
      data: product,
    },
  });
};

const update = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body);
  console.log("Product", product);

  const updatedProduct = await Product.findById(product._id);
  return res.status(200).json({
    Success: {
      message: "Success",
      data: updatedProduct,
    },
  });
};

const remove = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndRemove(productId);
  if (!product) {
    return res.status(404).json({
      Error: {
        message: "Product not found",
        data: { productId },
      },
    });
  }
  return res.status(200).json({
    Success: {
      message: "Remove product success",
      data: { product },
    },
  });
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
