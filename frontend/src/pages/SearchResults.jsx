import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");
  const [results, setResults] = useState({ doctors: [], labs: [] });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/search?query=${query}`);
        setResults(res.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Results for: <span className="text-blue-600">{query}</span></h2>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Doctors</h3>
        {results.doctors.length > 0 ? (
          <ul className="grid gap-2">
            {results.doctors.map((doc) => (
              <li key={doc._id} className="p-4 bg-gray-100 rounded shadow">
                {doc.name} - {doc.specialization}
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctors found.</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Lab Tests</h3>
        {results.labs.length > 0 ? (
          <ul className="grid gap-2">
            {results.labs.map((lab) => (
              <li key={lab._id} className="p-4 bg-gray-100 rounded shadow">
                {lab.name} - ₹{lab.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No lab tests found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
