import React, { useEffect, useState } from "react";
import axios from "axios";

const LabList = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    axios.get("/api/labs").then((res) => setLabs(res.data.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Labs List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {labs.map((lab) => (
          <div key={lab._id} className="border p-4 rounded shadow">
            <img src={lab.image} alt={lab.name} className="rounded mb-2" />
            <h3 className="font-semibold text-lg">{lab.name}</h3>
            <p>{lab.specialization}</p>
            <p>{lab.location}</p>
            <p className="text-green-600 font-bold">₹{lab.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabList;