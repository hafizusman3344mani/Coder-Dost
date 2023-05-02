const fs = require("fs");
const user = require("../model/user");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const User = user.User;

// // *************** Create User *******************
// exports.createUser = (req, res) => {
//   const user = new User(req.body);
//   const token = jwt.sign({email:user.email},process.env.SECRET_KEY);
//   user.token = token;
//   user
//     .save()
//     .then((result) => {
     
//       res.status(200).json({
//         result: "success",
//         message: "User added successfully!",
//         data: result,
//       });
//     })
//     .catch((error) => {
//       if (error["errors"]) {
//         return res.status(500).json({
//           result: error["errors"],
//           message: "User not added!",
//           data: null,
//         });
//       } else {
//         return res.status(500).json({
//           result: error,
//           message: "User not added!",
//           data: null,
//         });
//       }
//     });
// };

// ************* Get All Users *******************
exports.getAllUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.status(200).json({
        result: "success",
        message: "Users fetched successfully!",
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

// *************** Get User by Id *****************
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      console.log(user);
      if (!user) {
        res.status(200).json({
          result: "error",
          message: "User not found!",
          data: null,
        });
      } else {
        res.status(200).json({
          result: "success",
          message: "User fetched successfully!",
          data: user,
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

// *************** Replace a User Data ****************
exports.replaceUser = (req, res) => {
  const user = req.body;
  const userId = req.params.id;
  User.findOneAndReplace({ _id: userId }, user, { new: true })
    .then((result) => {
      res.status(200).json({
        result: "success",
        message: "User updated successfully!",
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

// ************ Update some User data ****************
exports.updateUser = (req, res) => {
  const userData = req.body;
  const userId = req.params.id;
  User.findOneAndUpdate({ _id: userId }, userData, { new: true })
    .then((result) => {
      res.status(200).json({
        result: "success",
        message: "User updated successfully!",
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

// ************* Delete User ****************
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.findOneAndDelete({ _id: userId })
    .then((result) => {
      if (!result) {
        res.status(200).json({
          result: "error",
          message: "User not found",
          data: null,
        });
      } else {
        res.status(200).json({
          result: "success",
          message: "User Deleted successfully!",
          data: result,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        result: "error",
        message: err,
        data: null,
      });
    });
};
