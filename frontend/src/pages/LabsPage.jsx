// frontend/src/pages/Labs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Labs = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLabs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/labs/list`);
      if (data.success) setLabs(data.labs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLabs();
  }, []);

  if (loading) return <div>Loading labs...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Labs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {labs.map((lab) => (
          <div key={lab._id} className="p-4 border rounded flex gap-4 items-center">
            <img src={lab.image || assets.doctor_icon} alt={lab.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{lab.name}</h3>
              <p className="text-sm text-gray-600">{lab.city} • {lab.phone}</p>
              <p className="text-sm mt-1 text-gray-700">{lab.about?.slice(0, 120)}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/lab/${lab._id}`} className="bg-primary text-white px-4 py-2 rounded-full text-sm">
                  Book Test
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labs;
