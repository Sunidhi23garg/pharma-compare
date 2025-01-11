import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import PharmaciesList from '../components/PharmaciesList';

const MedicineDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [medicine, setMedicine] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // For sorting pharmacies

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [medicineRes, pharmaciesRes] = await Promise.all([
          axios.get(`/medicines/${id}`),
          axios.get(`/pharmacies?medicineId=${id}&sortByPrice=${sortOrder}`) // Pass sortOrder to backend
        ]);
        setMedicine(medicineRes.data);
        setPharmacies(pharmaciesRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch medicine details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, sortOrder]); // Re-fetch on sortOrder change

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`/favorites/${id}`);
      } else {
        await axios.post('/favorites', { medicineId: id });
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Failed to update favorites:', err);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sortOrder when user changes it
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {medicine.name}
              </h1>
              <p className="text-gray-600 mb-4">
                Manufacturer: {medicine.manufacturer}
              </p>
            </div>
            {user && (
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  isFavorite
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Available at Pharmacies</h2>
            
            {/* Sort dropdown */}
            <div className="mb-4">
              <select
                onChange={handleSortChange}
                value={sortOrder}
                className="border p-2 rounded-md"
              >
                <option value="asc">Price Low to High</option>
                <option value="desc">Price High to Low</option>
              </select>
            </div>

            {/* Render PharmaciesList and pass pharmacies and medicineId */}
            <PharmaciesList
              pharmacies={pharmacies}
              sortOrder={sortOrder}
              medicineId={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
