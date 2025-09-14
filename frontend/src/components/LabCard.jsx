import React from "react";
import { useNavigate } from "react-router-dom";

const LabCard = ({ lab }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lab/${lab._id}`)}
      className="cursor-pointer border rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 bg-white"
    >
      <img
        src={lab.image}
        alt={lab.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-bold">{lab.name}</h3>
      <p className="text-gray-600">{lab.specialization}</p>
      <p className="text-sm text-gray-500">{lab.location}</p>
      <p className="text-green-600 font-semibold mt-2">₹{lab.price}</p>
    </div>
  );
};

export default LabCard;
