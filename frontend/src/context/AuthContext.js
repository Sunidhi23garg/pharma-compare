// // src/context/AuthContext.js
// import React, { createContext, useState, useContext } from 'react';
// import axios from '../api/axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('/auth/login', { email, password });
//       setToken(res.data.token);
//       localStorage.setItem('token', res.data.token);
//       return true;
//     } catch (error) {
//       throw error.response.data;
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const res = await axios.post('/auth/register', { name, email, password });
//       setToken(res.data.token);
//       localStorage.setItem('token', res.data.token);
//       return true;
//     } catch (error) {
//       throw error.response.data;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Fetch user data if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('/auth/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };
    
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      return true;
    } catch (error) {
      throw error.response.data;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/auth/register', { name, email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      return true;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
