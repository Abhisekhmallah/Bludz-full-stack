// backend/routes/labRoute.js
import express from "express";
import { addLab, allLabs, publicLabsList, labProfile, changeLabAvailability } from "../controllers/labController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Admin routes
router.post("/admin/add-lab", authAdmin, upload.single("image"), addLab);
router.get("/admin/all-labs", authAdmin, allLabs);
router.post("/admin/change-lab-availability", authAdmin, changeLabAvailability);

// Public routes
router.get("/labs/list", publicLabsList);
router.get("/labs/:id", labProfile);

export default router;
