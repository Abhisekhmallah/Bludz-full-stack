const express = require("express");
const router = express.Router();

// Import your models (adjust paths if needed)
const Doctor = require("../models/doctorModel");
const Lab = require("../models/labModel");

// Search API route
router.get("/", async (req, res) => {
  try {
    const query = req.query.query || "";

    const doctors = await Doctor.find({
      name: { $regex: query, $options: "i" },
    }).limit(10);

    const labs = await Lab.find({
      name: { $regex: query, $options: "i" },
    }).limit(10);

    res.json({ doctors, labs });
  } catch (err) {
    console.error("Search API error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
