const mongoose = require("mongoose");

productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
