const express = require("express");
const productController = require("../controller/product");

const productRouter = express.Router();


// Get all list from data.json file
productRouter
  .get("/", productController.getAllProducts)

  // Get product by Id from data.json file
  .get("/:id", productController.getProductById)

  // Add a product to data.json file
  .post("/", productController.addProduct)

  // put a product from data.json file
  .put("/:id", productController.replaceProduct)

  // patch some data to a product in data.json
  .patch("/:id", productController.updateProduct)

  // Delete a product from data.json file
  .delete("/:id", productController.deleteProduct);

  exports.productRouter = productRouter;
