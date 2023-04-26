const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    unique: [true, "Title should be unique"],
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 100,
    max: 100000,
  },
  discountPercentage: {
    type: Number,
    min: [0, "Percentage should be greater than 0"],
    max: [25, "Percentage shold be less than 25"],
  },
  rating: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  images: [String],
});

exports.Product = mongoose.model("Product", productSchema);
