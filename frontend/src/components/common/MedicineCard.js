import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const MedicineCard = ({ medicine, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the medicine is already a favorite
  useEffect(() => {
    if (user && user.favorites) {
      const favoriteExists = user.favorites.includes(medicine._id);
      setIsFavorite(favoriteExists);
    }
  }, [user, medicine]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Please log in to add favorites!");
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.post("/favorites/remove", { medicineId: medicine._id });
        setIsFavorite(false);
      } else {
        // Add to favorites
        await axios.post("/favorites/add", { medicineId: medicine._id });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Failed to update favorites:", err);
      alert("Error updating favorites. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {medicine.name || "Unknown Medicine"}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {medicine.manufacturer || "Manufacturer not specified"}
        </p>
        <p className="text-gray-700 mb-4">
          {medicine.description
            ? medicine.description.substring(0, 100) + "..."
            : "No description available"}
        </p>
        <p className="text-lg font-semibold text-gray-900 mb-4">
          Price: ₹{medicine.price || "Not available"}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Dosage: {medicine.dosage || "Not available"}
          </span>
          <Link
            to={`/medicine/${medicine._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            View Details
          </Link>
        </div>
        <div className="mt-4">
          <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded-md text-sm ${
              isFavorite
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
