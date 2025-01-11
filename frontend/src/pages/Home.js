import React, { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import MedicineCard from '../components/common/MedicineCard';
import axios from '../api/axios';

const Home = () => {
  const [popularMedicines, setPopularMedicines] = useState([]);
  const [error, setError] = useState(null); // To store error messages

  useEffect(() => {
    const fetchPopularMedicines = async () => {
      try {
        const response = await axios.get('/medicines?popular=true');
        console.log('Fetched medicines:', response.data); // Log the response
        setPopularMedicines(response.data);
      } catch (error) {
        console.error('Error fetching popular medicines:', error.response?.data || error.message);
        setError('Failed to load popular medicines. Please try again later.');
      }
    };
  
    fetchPopularMedicines();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-center mb-4">
          Find the Best Medicine Prices
        </h1>
        <SearchBar />
      </div>

      {/* Show error message if any */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularMedicines && popularMedicines.length > 0 ? (
          popularMedicines.map((data, index) => (
            // Ensuring that data.medicine._id is available for the key
            <MedicineCard key={data.medicine._id || index} medicine={data.medicine} />
          ))
        ) : (
          <div className="text-center col-span-full">No popular medicines found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;

