module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({
      Error: {
        message: "Permission deny",
        data: `User type: ${req.user.role}`,
      },
    });
  }
  return next();
};
