const mongoose = require("mongoose");

const LabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String },
  services: [{ type: String }],
  rating: { type: Number, default: 0 },
  priceRange: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Lab", LabSchema);
