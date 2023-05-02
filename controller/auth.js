const user = require("../model/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const User = user.User;

// *************** Create User *******************
exports.createUser = (req, res) => {
  const user = new User(req.body);
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (hash) {
      const privateKey = fs.readFileSync(
        path.resolve(__dirname, "../private.key"),
        "utf-8"
      );
      jwt.sign(
        { email: user.email },
        privateKey,
        { algorithm: "RS256" },
        function (err, token) {
          if (!err) {
            user.token = token;
            user.password = hash;
            user
              .save()
              .then((result) => {
                res.status(200).json({
                  result: "success",
                  message: "User added successfully!",
                  data: User.toClientObject(result),
                  // data: {
                  //   email: result.email,
                  //   firstName: result.firstName,
                  //   lastName: result.lastName,
                  //   _id: result.id,
                  //   token:result.token
                  // },
                });
              })
              .catch((error) => {
                if (error["errors"]) {
                  return res.status(500).json({
                    result: error["errors"],
                    message: "User not added!",
                    data: null,
                  });
                } else {
                  return res.status(500).json({
                    result: error,
                    message: "User not added!",
                    data: null,
                  });
                }
              });
          } else {
            res.status(500).json({
              result: err,
              message: "kll",
              data: null,
            });
          }
        }
      );
    } else {
      res.status(500).json({
        result: err,
        message: "kll",
        data: null,
      });
    }
  });
};

// *************** Login User ********************

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((doc) => {
      console.log(doc.password);
      console.log(req.body.password);

      bcrypt
        .compare(`${req.body.password}`, doc.password)
        .then((result) => {
          if(result){
            const privateKey = fs.readFileSync(
              path.resolve(__dirname, "../private.key"),
              "utf-8"
            );
            jwt.sign(
              { email: req.body.email },
              privateKey,
              { algorithm: "RS256" },
              function (err, token) {
                if (!err) {
                  doc.token = token;
                  doc
                    .save()
                    .then((result) => {
                      res.status(200).json({
                        result: "success",
                        message: "User loggedin successfully!",
                        data: User.toClientObject(result),
                        // data: {
                        //   email: result.email,
                        //   firstName: result.firstName,
                        //   lastName: result.lastName,
                        //   _id: result.id,
                        //   token:result.token
                        // },
                      });
                    })
                    .catch((error) => {
                      if (error["errors"]) {
                        return res.status(500).json({
                          result: error["errors"],
                          message: "User not logged in!",
                          data: null,
                        });
                      } else {
                        return res.status(500).json({
                          result: error,
                          message: "User not loggedin!",
                          data: null,
                        });
                      }
                    });
                } else {
                  res.status(500).json({
                    result: err,
                    message: "User not loggedin!",
                    data: null,
                  });
                }
              }
            );
          }else{
            res.status(401).json({
              err: 'Password is not correct',
            });
          }
        })
        .catch((err) => {
          res.status(401).json({
            err: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        err: err,
      });
    });
};
