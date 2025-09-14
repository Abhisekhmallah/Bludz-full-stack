import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LabDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    axios.get(`/api/labs/${id}`).then((res) => setLab(res.data.data));
  }, [id]);

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot!");
      return;
    }

    // Redirect to checkout (same logic as doctors)
    navigate("/checkout", {
      state: {
        type: "lab",
        lab,
        selectedSlot,
      },
    });
  };

  if (!lab) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <img
          src={lab.image}
          alt={lab.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-3xl font-bold">{lab.name}</h2>
        <p className="text-gray-600">{lab.specialization}</p>
        <p className="text-gray-500">{lab.location}</p>
        <p className="mt-2">{lab.description}</p>

        <h3 className="mt-6 font-semibold text-lg">Available Slots</h3>
        <div className="flex flex-wrap gap-3 mt-2">
          {lab.availableSlots?.map((slot, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full border ${
                selectedSlot === slot
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-green-600 font-bold text-xl">₹{lab.price}</p>
          <button
            onClick={handleBooking}
            className="bg-primary px-6 py-3 rounded-full text-white hover:scale-105 transition-all"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabDetails;
