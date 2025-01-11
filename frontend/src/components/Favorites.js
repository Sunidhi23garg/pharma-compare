import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorites when the component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Favorite Medicines</h2>
      {favorites.length === 0 ? (
        <p>No favorite medicines added yet.</p>
      ) : (
        <div>
          {favorites.map((medicine) => (
            <div key={medicine._id} className="medicine-card">
              <h3>{medicine.name}</h3>
              <p>{medicine.manufacturer}</p>
              <p>{medicine.description}</p>
              <p>Price: ₹{medicine.price}</p>
              <p>Dosage: {medicine.dosage}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
