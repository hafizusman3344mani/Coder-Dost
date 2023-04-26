require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const productRoute = require("./routes/product");
const userRouter = require("./routes/user");

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

console.log("env", process.env.DB_PASSWORD);
const server = express();

server.use(express.json());
server.use(express.static(process.env.PUBLIC_DIR));
server.use(morgan("combined"));
server.use("/api/v1/products", productRoute.productRouter);
server.use("/api/v1/users", userRouter.userRouter);

server.listen(process.env.PORT, console.log("Server started"));
