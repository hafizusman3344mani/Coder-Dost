const express = require("express");
const userController = require("../controller/user");

const userRouter = express.Router();


// Get all list from data.json file
userRouter
  .get("/", userController.getAllUsers)

  // Get product by Id from data.json file
  .get("/:id", userController.getUserById)

  // Add a product to data.json file
  .post("/", userController.addUser)

  // put a product from data.json file
  .put("/:id", userController.replaceUser)

  // patch some data to a product in data.json
  .patch("/:id", userController.updateUser)

  // Delete a product from data.json file
  .delete("/:id", userController.deleteUser);

  exports.userRouter = userRouter;
