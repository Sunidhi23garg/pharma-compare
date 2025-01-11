import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import MedicineCard from "../components/common/MedicineCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order: ascending
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/medicines?name=${searchQuery}`);
        setResults(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  // Handle sorting whenever sortOrder changes
  useEffect(() => {
    const sortedResults = [...results].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price; // Low to High
      if (sortOrder === "desc") return b.price - a.price; // High to Low
      return 0;
    });
    setResults(sortedResults);
  }, [sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Results Header */}
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "{searchQuery}"
      </h2>

      {/* Sort Dropdown */}
      <div className="mb-6 flex justify-end">
        <label htmlFor="sortOrder" className="mr-2 text-gray-700">
          Sort by:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Search Results */}
      {results.length === 0 ? (
        <p className="text-center text-gray-600">
          No medicines found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
