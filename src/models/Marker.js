const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const markerSchema = new Schema(
  {
    location: { type: Object, unique: false, required: true },
    price: { type: Object, unique: false, required: true },
    title: { type: String, unique: false, required: true },
    address: { type: String, unique: false, required: true },
    images: { type: [String], unique: false, required: false },
  },
);

module.exports = model('Marker', markerSchema);
