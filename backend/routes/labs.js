import express from "express";
import Lab from "../models/Lab.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const newLab = new Lab({ ...req.body, approved: false });
  await newLab.save();
  await sendEmail({
    to: "admin@example.com",
    subject: "New Lab Registration",
    text: `A new lab "${req.body.name}" has registered.`,
  });
  res.status(201).json({ message: "Lab submitted for approval." });
});

router.get("/pending", async (req, res) => {
  const labs = await Lab.find({ approved: false });
  res.json(labs);
});

router.post("/approve/:id", async (req, res) => {
  await Lab.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ message: "Lab approved." });
});

router.get("/approved", async (req, res) => {
  const labs = await Lab.find({ approved: true });
  res.json(labs);
});

router.get("/:id", async (req, res) => {
  const lab = await Lab.findById(req.params.id);
  res.json(lab);
});

export default router;
