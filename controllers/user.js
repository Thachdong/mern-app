const User = require("../models/user");
const { signToken } = require("../utils/userHelpers");

const register = async (req, res, next) => {
  const { phone, password, userName, address } = req.body;
  const user = await User.findOne({ phone });
  if (user)
    return res.status(400).json({
      Error: {
        message: "Phone number is already taken",
        data: { phone },
      },
    });
  const newUser = new User({
    phone,
    password,
    userName,
    address,
    role: req.user ? "admin" : "user",
    isLogin: true,
  });
  await newUser.save();
  const payload = {
    sub: newUser._id,
  };
  const token = await signToken(payload, process.env.JWT_SECRET);
  res.setHeader("Authorization", token);
  const plainUser = {
    ...newUser._doc,
    password: null,
  };
  return res.status(200).json({
    Success: {
      message: `${newUser.role} added`,
      data: plainUser,
    },
  });
};

const login = async (req, res, next) => {
  const token = await signToken({
    sub: req.user._id,
  });
  const user = await User.findById(req.user._id).populate("order");
  const plainUser = {
    ...user._doc,
    password: null,
  };

  res.setHeader("Authorization", token);
  return res.status(200).json({
    Success: {
      message: "Success",
      data: plainUser,
    },
  });
};

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { isLogin: false });
  return res.status(200).json({
    Success: {
      message: "You already out",
      data: null,
    },
  });
};

const getUsers = async (req, res, next) => {
  const userList = await User.find({});
  const plainUserList = userList.map((user) => ({
    ...user._doc,
    password: null,
  }));
  return res.status(200).json({
    Success: {
      message: "Success",
      data: plainUserList,
    },
  });
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("order");
  if (!user)
    return res.status(400).json({
      Error: {
        message: "User not found",
        data: { userId },
      },
    });
  const plainUser = {
    ...user._doc,
    password: null,
  };
  return res.status(200).json({
    Success: {
      message: "Success",
      data: plainUser,
    },
  });
};

const updateUserById = async (req, res, next) => {
  const { userId } = req.params;
  await User.findByIdAndUpdate(userId, req.body);
  const updatedUser = await User.findById(userId);
  const plainUser = {
    ...updatedUser._doc,
    password: null,
  };
  return res.status(200).json({
    Success: {
      message: "Success",
      data: plainUser,
    },
  });
};

const removeUserById = async (req, res, next) => {
  const { userId } = req.params;
  const userRole = await User.findById(userId);
  const isAdmin = userRole.role;
  if (isAdmin === "admin") {
    return res.status(200).json({
      Error: {
        data: "Admin never die",
      },
    });
  }
  const user = await User.findByIdAndRemove(userId);
  return res.status(200).json({
    Success: {
      message: "Success",
      data: isAdmin,
    },
  });
};

module.exports = {
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUserById,
  removeUserById,
};
