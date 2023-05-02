const express = require("express");
const userController = require("../controller/user");

const userRouter = express.Router();


// Get all list from data.json file
userRouter
  .get("/", userController.getAllUsers)

  // Get user by Id from data.json file
  .get("/:id", userController.getUserById)

  // put a user from data.json file
  .put("/:id", userController.replaceUser)

  // patch some data to a user in data.json
  .patch("/:id", userController.updateUser)

  // Delete a user from data.json file
  .delete("/:id", userController.deleteUser);

  exports.userRouter = userRouter;
