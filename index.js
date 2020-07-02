require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();

//Connect to mongodb via mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongodb connected"))
  .catch(() => console.log("Mongodb connection failed"));

//Top middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));

//Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

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
