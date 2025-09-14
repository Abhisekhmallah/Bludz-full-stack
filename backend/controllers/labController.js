import Lab from "../models/labModel.js";

// Add a new Lab
export const addLab = async (req, res) => {
  try {
    const newLab = new Lab(req.body);
    await newLab.save();
    res.status(201).json({ success: true, message: "Lab added successfully", data: newLab });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Labs
export const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json({ success: true, data: labs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Lab by ID
export const getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) return res.status(404).json({ success: false, message: "Lab not found" });
    res.status(200).json({ success: true, data: lab });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
