// // src/pages/Profile.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import { useAuth } from '../context/AuthContext';
// import MedicineCard from '../components/common/MedicineCard';

// const Profile = () => {
//   const { user, token } = useAuth();
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchFavorites = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/favorites');
//         setFavorites(response.data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch favorites. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, [token, navigate]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-4">Account Information</h2>
//           <div className="space-y-2">
//             <p className="text-gray-600">
//               <span className="font-medium">Email:</span> {user?.email}
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Member since:</span> {new Date(user?.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-6">Favorite Medicines</h2>
//           {error && (
//             <div className="text-red-600 mb-4">{error}</div>
//           )}
//           {favorites.length === 0 ? (
//             <p className="text-gray-600">You haven't added any medicines to your favorites yet.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {favorites.map((medicine) => (
//                 <MedicineCard key={medicine._id} medicine={medicine} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import MedicineCard from '../components/common/MedicineCard';

const Profile = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/favorites');
        setFavorites(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch favorites. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token, navigate]);

  const handleLogout = () => {
    logout();  // Assuming you have a logout function in your context
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {/* Account Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Member since:</span> {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Favorite Medicines */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Favorite Medicines</h2>
          {error && (
            <div className="text-red-600 mb-4">{error}</div>
          )}
          {favorites.length === 0 ? (
            <p className="text-gray-600">You haven't added any medicines to your favorites yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((medicine) => (
                <MedicineCard key={medicine._id} medicine={medicine} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
