const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { STATUSES: { FAIL, SUCCESS }, ERRORS: { UPLOAD_IMAGES_FAIL } } = require('../constants/Validation');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (filePath) => {
  const result = {
    status: FAIL,
    errors: [],
    url: '',
  };
  try {
    const uploadedImage = await cloudinary.uploader.upload(filePath, { height: 400, width: 400, crop: 'scale' });
    fs.unlink(filePath, (err) => {
      if (err) result.errors.push(UPLOAD_IMAGES_FAIL);
    });
    result.url = uploadedImage.url;
    result.status = SUCCESS;
  } catch (err) {
    result.errors.push(UPLOAD_IMAGES_FAIL);
  }
  return result;
};

module.exports = {
  uploadImage,
};
