// backend/controllers/labController.js
import labModel from "../models/labModel.js";
import { v2 as cloudinary } from "cloudinary";

// Admin: add lab (multipart form-data image upload handled by multer)
export const addLab = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      city,
      phone,
      about,
      services = "",
      fees = 0,
    } = req.body;

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "labs",
      });
      imageUrl = result.secure_url;
    }

    const lab = await labModel.create({
      name,
      email,
      image: imageUrl,
      address,
      city,
      phone,
      about,
      services: services ? services.split(",").map(s => s.trim()) : [],
      fees,
    });

    res.status(201).send({ success: true, message: "Lab added", lab });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

export const allLabs = async (req, res) => {
  try {
    const labs = await labModel.find().sort({ createdAt: -1 });
    res.send({ success: true, labs });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Public listing of available labs
export const publicLabsList = async (req, res) => {
  try {
    const labs = await labModel.find({ available: true }).sort({ createdAt: -1 });
    res.send({ success: true, labs });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Public: get single lab by id
export const labProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const lab = await labModel.findById(id);
    if (!lab) return res.status(404).send({ success: false, message: "Lab not found" });
    res.send({ success: true, lab });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Admin: toggle availability
export const changeLabAvailability = async (req, res) => {
  try {
    const { id } = req.body;
    const lab = await labModel.findById(id);
    if (!lab) return res.status(404).send({ success: false, message: "Lab not found" });
    lab.available = !lab.available;
    await lab.save();
    res.send({ success: true, message: "Availability updated" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
