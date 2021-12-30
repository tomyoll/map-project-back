const express = require('express');
const mapController = require('../controllers/MapController');
const saveFiles = require('../middleware/SaveFiles');

const router = express.Router();

router.post('/add-marker', saveFiles.array('images', 10), mapController.addNewMarker);
router.get('/get-markers', mapController.getMarkers);

module.exports = router;
