// // // routes/medicines.js
// const express = require('express');
// const router = express.Router();
// const medicineController = require('../controllers/medicineController');
// const auth = require('../middleware/auth');

// router.get('/', medicineController.searchMedicines);
// router.get('/:id', medicineController.getMedicineById);
// router.post('/', auth, medicineController.createMedicine);

// module.exports = router;


// // routes/medicines.js
// const express = require('express');
// const router = express.Router();
// const medicineController = require('../controllers/medicineController');
// const auth = require('../middleware/auth');

// // Get all medicines or filter by popular
// router.get('/', async (req, res) => {
//   try {
//     console.log('Received request with query:', req.query); // Log query params

//     // Call the controller function to search medicines
//     await medicineController.searchMedicines(req, res);
//   } catch (error) {
//     console.error('Error in /api/medicines route:', error.message); // Log the error
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Get medicine by id
// router.get('/:id', medicineController.getMedicineById);

// // Create a new medicine
// router.post('/', auth, medicineController.createMedicine);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const medicineController = require('../controllers/medicineController');  // Ensure this is the correct import

// // Get all medicines or filter by popular
// router.get('/', medicineController.searchMedicines); // Ensure the controller function is passed here

// // Get medicine by id
// router.get('/:id', medicineController.getMedicineById);

// // Create a new medicine
// router.post('/', medicineController.createMedicine);

// module.exports = router;


// routes/medicines.js
const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Get all medicines or filter by popular
router.get('/', medicineController.searchMedicines);  // This should handle the search query

// Get a single medicine by ID
router.get('/:id', medicineController.getMedicineById);

// Create a new medicine entry
router.post('/', medicineController.createMedicine);

module.exports = router;
