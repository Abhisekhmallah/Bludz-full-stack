import React, { useState } from "react";
import axios from "axios";

const AddLab = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    location: "",
    description: "",
    price: "",
    availableSlots: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, availableSlots: formData.availableSlots.split(",") };
      await axios.post("/api/labs", payload);
      alert("Lab added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding lab");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Lab</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input name="name" placeholder="Lab Name" value={formData.name} onChange={handleChange} required />
        <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
        <input name="availableSlots" placeholder="Available Slots (comma separated)" value={formData.availableSlots} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <button className="bg-blue-500 text-white py-2 rounded" type="submit">Add Lab</button>
      </form>
    </div>
  );
};

export default AddLab;
