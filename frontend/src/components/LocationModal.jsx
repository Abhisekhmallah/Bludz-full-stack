import React from "react";
import { useLocation } from "../context/LocationContext";

const LocationModal = ({ isOpen, onClose }) => {
  const { allowedLocations, setLocation } = useLocation();

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Select your location</h2>
        <ul className="flex flex-col gap-3">
          {allowedLocations.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocationSelect(loc)}
              className="w-full text-left px-4 py-2 border border-gray-200 rounded hover:bg-primary hover:text-white transition-all"
            >
              {loc}
            </button>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-600 hover:text-black"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LocationModal;