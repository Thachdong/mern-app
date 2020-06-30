require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
// const path = require("path");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
// const { cloudinaryConfig } = require("./utils/cloudinaryUpload");

const app = express();

//Connect to mongodb via mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongodb connected"))
  .catch(() => console.log("Mongodb connection failed"));

//Top middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(__dirname, "public")));
// app.use(cloudinaryConfig);

//Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

//Catch 404 error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  return next(error);
});

//Error handler
app.use((error, req, res, next) => {
  const err = app.get("env") === "development" ? error : {};
  const status = err.status || 500;
  return res.status(status).json({
    Error: {
      message: err.message,
      data: null,
    },
  });
});

//Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
