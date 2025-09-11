import { createContext, useContext, useEffect, useState } from "react";

// Allowed locations for the app
const allowedLocations = [ "Udalguri, Assam"];

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    // Load from localStorage if available
    return localStorage.getItem("selectedLocation") || "";
  });

  // Store location persistently
  useEffect(() => {
    if (location) {
      localStorage.setItem("selectedLocation", location);
    }
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation, allowedLocations }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
