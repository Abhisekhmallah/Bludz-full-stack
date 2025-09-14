import mongoose from "mongoose";

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true }, // e.g., "Pathology", "Radiology"
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL to lab image
  price: { type: Number, required: true }, // consultation/test price
  availableSlots: [{ type: String }], // e.g. ["10:00 AM", "11:00 AM", "02:00 PM"]
});

const Lab = mongoose.model("Lab", labSchema);
export default Lab;
