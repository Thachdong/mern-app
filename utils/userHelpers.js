const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signToken = async (payload) => {
  try {
    return await jwt.sign(payload, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  signToken,
};
