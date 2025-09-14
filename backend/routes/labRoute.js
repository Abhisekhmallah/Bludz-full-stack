import express from "express";
import { addLab, getLabs, getLabById } from "../controllers/labController.js";

const router = express.Router();

router.post("/", addLab);  // Add lab
router.get("/", getLabs);  // Get all labs
router.get("/:id", getLabById);  // Get lab by ID

export default router;