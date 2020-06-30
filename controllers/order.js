const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

/**
 * 1. Check items
 * 1.1 Is exist?
 * 1.2 Is enought stock for order?
 * 2. Add and save Order
 * 3. Update product stock (Implement in order model pre "save")
 * 4. Update user order (Implement in order model pre "save")
 */
const add = async (req, res, next) => {
  const { items, shippingAddress, totalPrice, phone, owner, tax } = req.body;
  await Promise.all(
    items.map(async (item) => {
      let product = await Product.findById(item.item);
      if (product.stock < item.qty) {
        return res.status(400).json({
          Error: {
            message: "Product stock does not enought",
            data: { name: product.name, stock: product.stock },
          },
        });
      }
    })
  );
  const newOrder = new Order({
    owner,
    items,
    shippingAddress,
    totalPrice,
    phone,
    tax,
  });
  await newOrder.save();
  return res.status(200).json({
    Success: {
      message: "Success",
      data: newOrder,
    },
  });
};

const getOne = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({
      Error: {
        message: "Order not found",
        data: { orderId },
      },
    });
  }
  return res.status(200).json({
    Success: {
      message: "Get order success",
      data: { order },
    },
  });
};

const getAll = async (req, res, next) => {
  const orders = await Order.find({});
  return res.status(200).json({
    Success: {
      message: "Success",
      data: orders,
    },
  });
};

const getMine = async (req, res, next) => {
  const mine = await User.findById(req.user._id).populate("order");
  const myOrders = mine.order;
  return res.status(200).json({
    Success: {
      message: "Success",
      data: myOrders,
    },
  });
};

const remove = async (req, res, next) => {
  const { orderId } = req.params;
  const removedOrder = await Order.findByIdAndRemove(orderId);
  if (!removedOrder) {
    return res.status(404).json({
      Error: {
        message: "Order not found",
        data: { orderId },
      },
    });
  }
  const user = await User.findById(removedOrder.owner);
  let userOrder = user.order;
  let index = userOrder.indexOf(removedOrder._id);
  if (index > -1) {
    userOrder.splice(index, 1);
  }
  await user.save();
  return res.status(200).json({
    Success: {
      message: "Success",
      data: { removedOrder },
    },
  });
};

const update = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findByIdAndUpdate(orderId, req.body);
  if (!order) {
    return res.status(404).json({
      Error: {
        message: "Order not found",
        data: { orderId },
      },
    });
  }
  return res.status(200).json({
    Success: {
      message: "Order updated",
      data: { order },
    },
  });
};

module.exports = {
  add,
  getOne,
  getAll,
  getMine,
  remove,
  update,
};
