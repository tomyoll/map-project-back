const { STATUSES: { FAIL, SUCCESS }, VALIDATION_ERRORS } = require('../constants/Validation');

const validateMarkerData = async (markerData) => {
  const result = {
    status: FAIL,
    errors: [],
  };
  const {
    price, title, location, address,
  } = markerData;
  if (!price || !title || !location || !address) {
    if (!price.value || !price.type) {
      result.errors.push(VALIDATION_ERRORS.NO_PRICE);
    }
    if (!title) {
      result.errors.push(VALIDATION_ERRORS.NO_TITLE);
    }
    if (!location) {
      result.errors.push(VALIDATION_ERRORS.NO_LOCATION);
    }
    if (!address) {
      result.errors.push(VALIDATION_ERRORS.NO_ADDRESS);
    }
    return result;
  }

  if (price.value > 9999999 || title.length < 4 || address.length < 4) {
    if (price.value > 9999999) {
      result.errors.push(VALIDATION_ERRORS.SHORT_PRICE);
    }
    if (title.length < 4) {
      result.errors.push(VALIDATION_ERRORS.SHORT_TITLE);
    }
    if (address.length < 4) {
      result.errors.push(VALIDATION_ERRORS.SHORT_ADDRESS);
    }
    return result;
  }

  if (price.value < 0 || title.length > 100 || address.length > 100) {
    if (price.value > 9999999) {
      result.errors.push(VALIDATION_ERRORS.LONG_PRICE);
    }
    if (title.length > 100) {
      result.errors.push(VALIDATION_ERRORS.LONG_TITLE);
    }
    if (address.length > 100) {
      result.errors.push(VALIDATION_ERRORS.LONG_ADDRESS);
    }
    return result;
  }

  result.status = SUCCESS;
  return result;
};

module.exports = {
  validateMarkerData,
};
