require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const productRoute = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");


const jwt = require("jsonwebtoken");

// Connecting DB
mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: "CoderDost",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

const server = express();
const auth = (req, res, next) => {
 
  try {
    const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8');
    const token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, publicKey, function (err, decoded) {
      console.log(decoded);
      if (decoded.email) {
        next();
      } else {
        res.sendStatus(401);
      }
    });
  } catch (err) {
    res.sendStatus(401);
  }
};
server.use(express.json());
server.use(express.static(process.env.PUBLIC_DIR));
server.use(morgan("combined"));
server.use("/api/v1/user", authRouter.authRouter);
server.use("/api/v1/products", productRoute.productRouter);
server.use("/api/v1/users", auth, userRouter.userRouter);

server.listen(process.env.PORT, console.log("Server started"));
