import express from "express";
import Lab from "../models/Lab.js";

const router = express.Router();

// @desc Get all labs
router.get("/", async (req, res) => {
  try {
    const labs = await Lab.find();
    res.json(labs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc Add a new lab
router.post("/", async (req, res) => {
  try {
    const lab = new Lab(req.body);
    await lab.save();
    res.status(201).json(lab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc Get single lab
router.get("/:id", async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) return res.status(404).json({ error: "Lab not found" });
    res.json(lab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc Update lab
router.put("/:id", async (req, res) => {
  try {
    const lab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc Delete lab
router.delete("/:id", async (req, res) => {
  try {
    await Lab.findByIdAndDelete(req.params.id);
    res.json({ message: "Lab deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
