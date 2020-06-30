const { uploader, config } = require("cloudinary");
const DataUri = require("datauri/parser");
const path = require("path");

//Config cloudinary
const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

//datauri/parser: Transfer buffer data to file can be uploaded
const dUri = new DataUri();
const dataUri = (file) =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);

//Upload single file to cloudinary
const cloudinaryUpload = async (req) => {
  if (!req.file) return false;
  const file = dataUri(req.file).content;
  const cloudinaryUrl = await uploader.upload(image);
  return cloudinaryUrl.url;
};

//upload multiple file
const mutipleFilesUpload = async (req) => {
  console.log(req.files);

  const promiseFiles = req.files.map(async (file) => {
    const content = dataUri(file).content;
    const cloudinaryUrl = await uploader.upload(content);
    return cloudinaryUrl.url;
  });
  const urls = await Promise.all(promiseFiles);
  return urls;
};

module.exports = {
  cloudinaryUpload,
  cloudinaryConfig,
  mutipleFilesUpload,
};
