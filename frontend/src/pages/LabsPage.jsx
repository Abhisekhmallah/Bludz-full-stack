import React, { useEffect, useState } from "react";
import axios from "axios";
import LabCard from "../components/LabCard";

const LabsPage = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    axios.get("/api/labs").then((res) => setLabs(res.data.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Available Labs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <LabCard key={lab._id} lab={lab} />
        ))}
      </div>
    </div>
  );
};

export default LabsPage;
