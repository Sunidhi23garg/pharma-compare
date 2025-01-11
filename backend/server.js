// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const app = express();

// Connect to MongoDB database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/medicines', require('./routes/medicines'));
app.use('/api/pharmacies', require('./routes/pharmacies'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/user', userRoutes); // Add user routes for user-related operations

// Set port for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
