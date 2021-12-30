const uploadService = require('./UploadService');
const markerModel = require('../models/Marker');
const { removeSpecialSymbols } = require('../utils/PreparationUtil');
const { STATUSES: { FAIL, SUCCESS }, ERRORS: { GET_DATA_FAIL } } = require('../constants/Validation');
const { DEFAULT_IMAGE_URL } = require('../constants');
const { validateMarkerData } = require('./ValidationService');

const createMarker = async (markerData, markerImages) => {
  const result = {
    errors: [],
    status: FAIL,
  };

  const location = JSON.parse(markerData.location);
  const title = removeSpecialSymbols(markerData.title);
  const address = removeSpecialSymbols(markerData.address);
  const priceObject = JSON.parse(markerData.price);
  const price = {
    value: removeSpecialSymbols(priceObject.value),
    type: priceObject.type,
  };

  const dataValidation = await validateMarkerData({
    price, title, location, address,
  });
  if (dataValidation.status === FAIL) {
    result.errors.push(...(dataValidation.errors));
    return result;
  }
  const imagesURL = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const image of markerImages) {
    try {
      const uploadResult = await uploadService.uploadImage(image.path);
      if (uploadResult.status === FAIL) {
        result.errors.push(...uploadResult.errors);
        return result;
      }
      imagesURL.push(uploadResult.url);
    } catch (err) {
      result.errors.push(err.message);
      return result;
    }
  }

  if (imagesURL.length === 0) {
    imagesURL.push(DEFAULT_IMAGE_URL);
  }
  try {
    await markerModel.create({
      price, title, address, location, images: imagesURL,
    });
    result.status = SUCCESS;
  } catch (err) {
    result.errors.push(err.message);
    return result;
  }
  return result;
};

const findAllMarkers = async () => {
  const result = {
    status: FAIL,
    errors: [],
    markers: [],
  };
  try {
    const allMarkers = await markerModel.find();
    result.status = SUCCESS;
    result.markers.push(...allMarkers);
  } catch (err) {
    result.errors.push(GET_DATA_FAIL);
    return result;
  }
  return result;
};

const findMarkersByParams = async (params) => {
  const result = {
    status: FAIL,
    errors: [],
    markers: [],
  };
  const skipDocumentsCount = parseInt(params.skip, 10);
  const limitOfDocumentsCount = parseInt(params.limit, 10);
  try {
    const findMarkers = await markerModel.find().skip(skipDocumentsCount).limit(limitOfDocumentsCount);
    result.status = SUCCESS;
    result.markers.push(...findMarkers);
  } catch (err) {
    result.errors.push(GET_DATA_FAIL);
    console.log(err.message);
    return result;
  }
  return result;
};

module.exports = {
  createMarker,
  findAllMarkers,
  findMarkersByParams,
};
