const multer = require("multer");
/**
 * Upload file as buffer
 */
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, true);
  }
};
const upload = multer({ storage, fileFilter });
// const multerUpload = upload.single("image");
const multerUpload = upload.array("image");

module.exports = {
  multerUpload,
};
