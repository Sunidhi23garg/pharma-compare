// src/pages/FavoritesPage.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';  // Adjust based on your axios setup
import MedicineCard from '../components/common/MedicineCard';  // Reuse the MedicineCard component

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Fetch favorites from the backend API (ensure the user is authenticated)
        const response = await axios.get('/favorites');  // Adjust the endpoint if needed
        setFavorites(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load favorites.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Favorite Medicines</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">You have no favorite medicines yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
