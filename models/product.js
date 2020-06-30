const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  disc: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().toDateString(),
  },
});

module.exports = mongoose.model("Product", ProductSchema);
