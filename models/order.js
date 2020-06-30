const mongoose = require("mongoose");
const Product = require("./product");
const User = require("./user");

const ItemsSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [ItemsSchema],
    totalPrice: {
      type: Number,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    tax: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["new", "checked", "shipping", "paid"],
      default: "new",
    },
    createdAt: {
      type: String,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", async function (next) {
  await Promise.all(
    this.items.map(async (item) => {
      let product = await Product.findById(item.item);
      let stock = product.stock;
      product.stock = stock - item.qty;
      await product.save();
    })
  );
  const user = await User.findById(this.owner);
  user.order.push(this._id);
  await user.save();
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
