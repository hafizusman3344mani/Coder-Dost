const fs = require("fs");
const productModel = require("../model/product");
const { default: mongoose } = require("mongoose");
const Product = productModel.Product;
const ejs = require('ejs');
const path = require('path');



// view SSR 

exports.getAllProductsSSr = (req, res) => {
  Product.find({})
    .then((result) => {
    ejs.renderFile(path.resolve(__dirname, '../pages/index.ejs'),{products:result},function(err,str){
res.send(str);

    })
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err,
        data: null,
      });
    });
};


// *************** Create Product *******************
exports.addProduct = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((result) => {
      res.status(200).json({
        result: "success",
        message: "Product added successfully!",
        data: result,
      });
    })
    .catch((error) => {
      if (error["errors"]) {
        return res.status(500).json({
          result: error["errors"],
          message: "Product not added!",
          data: null,
        });
      } else {
        return res.status(500).json({
          result: error,
          message: "Product not added!",
          data: null,
        });
      }
    });
};

// ************* Get All Products *******************
exports.getAllProducts = (req, res) => {
  Product.find({})
    .then((result) => {
      res.status(200).json({
        result: "success",
        message: "Products fetched successfully!",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err,
        data: null,
      });
    });
};

// *************** Get Product by Id *****************
exports.getProductById = (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      console.log(product);
      if (!product) {
        res.status(200).json({
          result: "error",
          message: "Product not found!",
          data: null,
        });
      } else {
        res.status(200).json({
          result: "success",
          message: "Product fetched successfully!",
          data: product,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err,
        data: null,
      });
    });
};

// *************** Replace a Product ****************
exports.replaceProduct = (req, res) => {
  const product = req.body;
  const productId = req.params.id;
  Product.findOneAndReplace({ _id: productId }, product, { new: true })
    .then((result) => {
      res.status(200).json({
        result: "success",
        message: "Product updated successfully!",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        result: "error",
        message: err,
        data: null,
      });
    });
};

// ************ Update some data in Product ****************
exports.updateProduct = (req, res) => {
  const product = req.body;
  const productId = req.params.id;
  Product.findOneAndUpdate({ _id: productId }, product, { new: true })
    .then((result) => {
      res.status(200).json({
        result: "success",
        message: "Product updated successfully!",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        result: "error",
        message:err,
        data: null,
      });
    });
};


// ************* Delete Product ****************
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  Product.findOneAndDelete({ _id: productId })
    .then((result) => {
      if(!result){
        res.status(200).json({
          result: "error",
          message: "Product not found",
          data: null,
        });
      }else{
        res.status(200).json({
          result: "success",
          message: "Product Deleted successfully!",
          data: result,
        });
      }
     
    })
    .catch((err) => {
      return res.status(500).json({
        result: "error",
        message:err,
        data: null,
      });
    });
};
