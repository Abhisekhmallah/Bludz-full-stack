// admin/src/pages/Admin/LabsList.jsx
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const LabsList = () => {
  const { labs, getAllLabs, changeLabAvailability, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllLabs();
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-4">All Labs</h1>

      <div className="grid grid-cols-1 gap-4">
        {labs?.map((lab) => (
          <div key={lab._id} className="flex items-center gap-4 p-3 border rounded">
            <img src={lab.image || assets.doctor_icon} alt={lab.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <p className="text-lg font-medium">{lab.name}</p>
              <p className="text-sm text-gray-600">{lab.city} • {lab.phone}</p>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={lab.available} onChange={() => changeLabAvailability(lab._id)} />
                <span>Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabsList;
