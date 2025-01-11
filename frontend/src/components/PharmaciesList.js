// src/components/PharmaciesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmaciesList = ({ medicineId }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get(`/api/pharmacies?medicineId=${medicineId}&sortByPrice=${sortOrder}`);
        setPharmacies(response.data);
      } catch (error) {
        console.error("Error fetching pharmacies", error);
      }
    };

    fetchPharmacies();
  }, [medicineId, sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <h2>Pharmacies Offering the Medicine</h2>
      <select onChange={handleSortChange} value={sortOrder}>
        <option value="asc">Price Low to High</option>
        <option value="desc">Price High to Low</option>
      </select>
      <ul>
        {pharmacies.length > 0 ? (
          pharmacies.map(pharmacy => (
            <li key={pharmacy._id}>
              <h3>{pharmacy.pharmacyName}</h3>
              <p>{pharmacy.address}</p>
              <p>{pharmacy.contact}</p>
              {/* Loop through the medicines offered in the pharmacy */}
              <ul>
                {pharmacy.medicines.map((medicine, index) => (
                  <li key={index}>
                    <p>{medicine.medicine.name}</p>
                    <p>Price: ₹{medicine.price}</p>
                    <p>In Stock: {medicine.inStock ? "Yes" : "No"}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No pharmacies found offering this medicine.</p>
        )}
      </ul>
    </div>
  );
};

export default PharmaciesList;
