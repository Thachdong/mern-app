const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    match: /^0([0-9]{9})$/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isLogin: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

//Hashing password before saving into database
UserSchema.pre("save", async function (next) {
  try {
    //1. By default: in the first save isModified of user is true, and after it will be false
    if (!this.isModified("password")) return next();
    //2. Generate salt
    const salt = await bcrypt.genSalt(10);
    //3. Generate hash
    const hashedPassword = await bcrypt.hash(this.password, salt);
    //4. Saving into database
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

//Methods
UserSchema.methods = {
  verifyPassword: async function (plainPassword, next) {
    try {
      return await bcrypt.compare(plainPassword, this.password);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = mongoose.model("User", UserSchema);
