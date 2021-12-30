const { createMarker, findAllMarkers, findMarkersByParams } = require('../services/MapService');
const { STATUSES: { FAIL } } = require('../constants/Validation');

const addNewMarker = async (req, res) => {
  const response = await createMarker(req.body, req.files);
  if (response.status === FAIL) {
    return res.status(400).json(response);
  }
  return res.status(200).json(response);
};

const getMarkers = async (req, res) => {
  if (req.query.limit) {
    const markers = await findMarkersByParams(req.query);
    if (markers.status === FAIL) {
      return res.status(400).json(markers.errors);
    }
    return res.status(200).json(markers.markers);
  }

  const markers = await findAllMarkers();
  if (markers.status === FAIL) {
    return res.status(400).json(markers.errors);
  }
  return res.status(200).json(markers.markers);
};

module.exports = {
  addNewMarker,
  getMarkers,
};
