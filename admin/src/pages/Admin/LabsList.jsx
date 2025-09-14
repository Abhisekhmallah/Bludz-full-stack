import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const LabsList = () => {
  const { labs, getAllLabs, changeLabAvailability } = useContext(AdminContext);

  useEffect(() => {
    getAllLabs();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Labs List</h2>

      {labs.length === 0 ? (
        <p className="text-gray-500">No labs found.</p>
      ) : (
        <table className="w-full border border-gray-200 text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Lab Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab, index) => (
              <tr key={lab._id} className="border-b">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{lab.name}</td>
                <td className="py-3 px-4">{lab.email}</td>
                <td className="py-3 px-4">{lab.phone}</td>
                <td className="py-3 px-4">
                  {lab.available ? (
                    <span className="text-green-600 font-medium">Available</span>
                  ) : (
                    <span className="text-red-600 font-medium">Unavailable</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => changeLabAvailability(lab._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LabsList;
