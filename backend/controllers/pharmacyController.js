// // // // // // controllers/pharmacyController.js
// // // // // const Pharmacy = require('../models/Pharmacy');

// // // // // exports.getPharmaciesByMedicine = async (req, res) => {
// // // // //   try {
// // // // //     const { medicineId } = req.query;
// // // // //     const pharmacies = await Pharmacy.find({
// // // // //       'medicines.medicineId': medicineId
// // // // //     }).select('name address contact medicines.$');
// // // // //     res.json(pharmacies);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Server error' });
// // // // //   }
// // // // // };

// // // // // exports.getPharmacyById = async (req, res) => {
// // // // //   try {
// // // // //     const pharmacy = await Pharmacy.findById(req.params.id);
// // // // //     if (!pharmacy) {
// // // // //       return res.status(404).json({ error: 'Pharmacy not found' });
// // // // //     }
// // // // //     res.json(pharmacy);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Server error' });
// // // // //   }
// // // // // };

// // // // // exports.updateMedicinePrice = async (req, res) => {
// // // // //   try {
// // // // //     const { pharmacyId } = req.params;
// // // // //     const { medicineId, price, inStock } = req.body;
    
// // // // //     const pharmacy = await Pharmacy.findById(pharmacyId);
// // // // //     if (!pharmacy) {
// // // // //       return res.status(404).json({ error: 'Pharmacy not found' });
// // // // //     }

// // // // //     const medicineIndex = pharmacy.medicines.findIndex(
// // // // //       m => m.medicineId.toString() === medicineId
// // // // //     );

// // // // //     if (medicineIndex === -1) {
// // // // //       pharmacy.medicines.push({ medicineId, price, inStock });
// // // // //     } else {
// // // // //       pharmacy.medicines[medicineIndex].price = price;
// // // // //       pharmacy.medicines[medicineIndex].inStock = inStock;
// // // // //       pharmacy.medicines[medicineIndex].lastUpdated = Date.now();
// // // // //     }

// // // // //     await pharmacy.save();
// // // // //     res.json(pharmacy);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Server error' });
// // // // //   }
// // // // // };

// // // // const Pharmacy = require('../models/Pharmacy');
// // // // const Medicine = require('../models/Medicine');

// // // // exports.getPharmaciesByMedicine = async (req, res) => {
// // // //   try {
// // // //     const { medicineId } = req.query;

// // // //     if (!medicineId) {
// // // //       return res.status(400).json({ error: "Medicine ID is required" });
// // // //     }

// // // //     const pharmacies = await Pharmacy.find({
// // // //       'medicines.medicineId': medicineId
// // // //     }).select('name address contact medicines');

// // // //     if (!pharmacies.length) {
// // // //       return res.status(404).json({ error: "No pharmacies found offering this medicine" });
// // // //     }

// // // //     const result = pharmacies.map(pharmacy => {
// // // //       const medicineDetails = pharmacy.medicines.find(
// // // //         medicine => medicine.medicineId.toString() === medicineId
// // // //       );

// // // //       return {
// // // //         pharmacyName: pharmacy.name,
// // // //         address: pharmacy.address,
// // // //         contact: pharmacy.contact,
// // // //         medicine: {
// // // //           price: medicineDetails.price,
// // // //           inStock: medicineDetails.inStock
// // // //         }
// // // //       };
// // // //     });

// // // //     res.json(result);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // };

// // // // exports.getPharmacyById = async (req, res) => {
// // // //   try {
// // // //     const pharmacy = await Pharmacy.findById(req.params.id);
// // // //     if (!pharmacy) {
// // // //       return res.status(404).json({ error: 'Pharmacy not found' });
// // // //     }
// // // //     res.json(pharmacy);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // };

// // // // exports.updateMedicinePrice = async (req, res) => {
// // // //   try {
// // // //     const { pharmacyId } = req.params;
// // // //     const { medicineId, price, inStock } = req.body;
    
// // // //     const pharmacy = await Pharmacy.findById(pharmacyId);
// // // //     if (!pharmacy) {
// // // //       return res.status(404).json({ error: 'Pharmacy not found' });
// // // //     }

// // // //     const medicineIndex = pharmacy.medicines.findIndex(
// // // //       m => m.medicineId.toString() === medicineId
// // // //     );

// // // //     if (medicineIndex === -1) {
// // // //       pharmacy.medicines.push({ medicineId, price, inStock });
// // // //     } else {
// // // //       pharmacy.medicines[medicineIndex].price = price;
// // // //       pharmacy.medicines[medicineIndex].inStock = inStock;
// // // //       pharmacy.medicines[medicineIndex].lastUpdated = Date.now();
// // // //     }

// // // //     await pharmacy.save();
// // // //     res.json(pharmacy);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // };


// // // const Pharmacy = require('../models/Pharmacy');
// // // const Medicine = require('../models/Medicine');

// // // // Get all pharmacies offering a specific medicine
// // // exports.getPharmaciesByMedicine = async (req, res) => {
// // //   try {
// // //     const { medicineId, sortByPrice } = req.query;  // Added query parameter for sorting

// // //     if (!medicineId) {
// // //       return res.status(400).json({ error: "Medicine ID is required" });
// // //     }

// // //     // Find pharmacies offering the specific medicine by its medicineId
// // //     const pharmacies = await Pharmacy.find({
// // //       'medicines.medicineId': medicineId
// // //     }).select('name address contact medicines');

// // //     if (!pharmacies.length) {
// // //       return res.status(404).json({ error: "No pharmacies found offering this medicine" });
// // //     }

// // //     // Map through the pharmacies and extract relevant data
// // //     const result = pharmacies.map(pharmacy => {
// // //       const medicineDetails = pharmacy.medicines.find(
// // //         medicine => medicine.medicineId.toString() === medicineId
// // //       );

// // //       return {
// // //         pharmacyName: pharmacy.name,
// // //         address: pharmacy.address,
// // //         contact: pharmacy.contact,
// // //         medicine: {
// // //           price: medicineDetails.price,
// // //           inStock: medicineDetails.inStock
// // //         }
// // //       };
// // //     });

// // //     // Sort pharmacies by price if `sortByPrice` query parameter is passed
// // //     if (sortByPrice) {
// // //       const sortOrder = sortByPrice === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending
// // //       result.sort((a, b) => {
// // //         return sortOrder * (a.medicine.price - b.medicine.price);
// // //       });
// // //     }

// // //     res.json(result);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };

// // // // Get pharmacy details by ID
// // // exports.getPharmacyById = async (req, res) => {
// // //   try {
// // //     const pharmacy = await Pharmacy.findById(req.params.id);
// // //     if (!pharmacy) {
// // //       return res.status(404).json({ error: 'Pharmacy not found' });
// // //     }
// // //     res.json(pharmacy);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };

// // // // Update medicine price and stock in a pharmacy
// // // exports.updateMedicinePrice = async (req, res) => {
// // //   try {
// // //     const { pharmacyId } = req.params;
// // //     const { medicineId, price, inStock } = req.body;

// // //     const pharmacy = await Pharmacy.findById(pharmacyId);
// // //     if (!pharmacy) {
// // //       return res.status(404).json({ error: 'Pharmacy not found' });
// // //     }

// // //     // Find the medicine in the pharmacy's medicine list
// // //     const medicineIndex = pharmacy.medicines.findIndex(
// // //       m => m.medicineId.toString() === medicineId
// // //     );

// // //     if (medicineIndex === -1) {
// // //       pharmacy.medicines.push({ medicineId, price, inStock });
// // //     } else {
// // //       pharmacy.medicines[medicineIndex].price = price;
// // //       pharmacy.medicines[medicineIndex].inStock = inStock;
// // //       pharmacy.medicines[medicineIndex].lastUpdated = Date.now();
// // //     }

// // //     // Save the updated pharmacy details
// // //     await pharmacy.save();
// // //     res.json(pharmacy);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };


// // const Pharmacy = require('../models/Pharmacy');
// // const Medicine = require('../models/Medicine');

// // // Get all pharmacies offering a specific medicine
// // exports.getPharmaciesByMedicine = async (req, res) => {
// //   try {
// //     const { medicineId, sortByPrice } = req.query; // Extract medicineId and sortByPrice from query

// //     if (!medicineId) {
// //       return res.status(400).json({ error: "Medicine ID is required" });
// //     }

// //     // Find pharmacies offering the specific medicine
// //     const pharmacies = await Pharmacy.find({
// //       'medicines.medicineId': medicineId
// //     }).select('name address contact medicines');

// //     if (!pharmacies || pharmacies.length === 0) {
// //       return res.status(404).json({ error: "No pharmacies found offering this medicine" });
// //     }

// //     // Extract relevant data
// //     const result = pharmacies.map(pharmacy => {
// //       const medicineDetails = pharmacy.medicines.find(
// //         medicine => medicine.medicineId.toString() === medicineId
// //       );

// //       // Ensure medicine details are found (in case of any unexpected structure issues)
// //       if (!medicineDetails) {
// //         return null;
// //       }

// //       return {
// //         pharmacyName: pharmacy.name,
// //         address: pharmacy.address,
// //         contact: pharmacy.contact,
// //         medicine: {
// //           price: medicineDetails.price,
// //           inStock: medicineDetails.inStock
// //         }
// //       };
// //     }).filter(item => item !== null); // Remove any null entries

// //     // Sort pharmacies by price if `sortByPrice` is provided
// //     if (sortByPrice) {
// //       const sortOrder = sortByPrice === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending
// //       result.sort((a, b) => sortOrder * (a.medicine.price - b.medicine.price));
// //     }

// //     res.json(result);
// //   } catch (err) {
// //     console.error(err); // Log error for debugging
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };

// // // Get pharmacy details by ID
// // exports.getPharmacyById = async (req, res) => {
// //   try {
// //     const pharmacy = await Pharmacy.findById(req.params.id);
// //     if (!pharmacy) {
// //       return res.status(404).json({ error: 'Pharmacy not found' });
// //     }
// //     res.json(pharmacy);
// //   } catch (err) {
// //     console.error(err); // Log error for debugging
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };

// // // Update medicine price and stock in a pharmacy
// // exports.updateMedicinePrice = async (req, res) => {
// //   try {
// //     const { pharmacyId } = req.params;
// //     const { medicineId, price, inStock } = req.body;

// //     // Validate input
// //     if (!medicineId || price == null || inStock == null) {
// //       return res.status(400).json({ error: 'medicineId, price, and inStock are required' });
// //     }

// //     const pharmacy = await Pharmacy.findById(pharmacyId);
// //     if (!pharmacy) {
// //       return res.status(404).json({ error: 'Pharmacy not found' });
// //     }

// //     // Find the medicine in the pharmacy's medicines array
// //     const medicineIndex = pharmacy.medicines.findIndex(
// //       m => m.medicineId.toString() === medicineId
// //     );

// //     if (medicineIndex === -1) {
// //       // Add new medicine entry if it doesn't exist
// //       pharmacy.medicines.push({
// //         medicineId,
// //         price,
// //         inStock,
// //         lastUpdated: Date.now()
// //       });
// //     } else {
// //       // Update existing medicine details
// //       pharmacy.medicines[medicineIndex].price = price;
// //       pharmacy.medicines[medicineIndex].inStock = inStock;
// //       pharmacy.medicines[medicineIndex].lastUpdated = Date.now();
// //     }

// //     // Save the updated pharmacy details
// //     await pharmacy.save();
// //     res.json(pharmacy);
// //   } catch (err) {
// //     console.error(err); // Log error for debugging
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };



// const Medicine = require('../models/Medicine');
// const Pharmacy = require('../models/Pharmacy'); // Import Pharmacy model to access prices
// const mongoose = require('mongoose');

// // Utility function to validate ObjectId
// const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// // Search for medicines by name and return details with price information
// exports.searchMedicines = async (req, res) => {
//   try {
//     const { name, popular, page = 1, limit = 20 } = req.query;
//     let query = {};

//     if (name) {
//       query.name = { $regex: name, $options: 'i' };  // Perform case-insensitive search
//     }

//     if (popular === 'true') {
//       query.isPopular = true;
//     }

//     // Fetch medicines based on the search query with pagination
//     const medicines = await Medicine.find(query)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     if (medicines.length === 0) {
//       return res.status(404).json({ message: "No medicines found." });
//     }

//     // Fetch the prices for each medicine from pharmacies
//     const medicineWithPrices = await Promise.all(medicines.map(async (medicine) => {
//       const pharmacies = await Pharmacy.find({
//         'medicines.medicineId': medicine._id
//       }).select('name address contact medicines'); // Fetch pharmacies that sell this medicine

//       // Map over pharmacies and return the price information for each pharmacy
//       const pharmaciesWithPrice = pharmacies.map(pharmacy => {
//         const medicineInfo = pharmacy.medicines.find(m => m.medicineId.toString() === medicine._id.toString());
//         return {
//           pharmacyName: pharmacy.name,
//           address: pharmacy.address,
//           contact: pharmacy.contact,
//           price: medicineInfo ? medicineInfo.price : null
//         };
//       });

//       return {
//         medicine,
//         pharmacies: pharmaciesWithPrice
//       };
//     }));

//     res.json(medicineWithPrices);  // Return medicines along with pharmacy details and prices
//   } catch (err) {
//     console.error("Error fetching medicines:", err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


const Medicine = require('../models/Medicine'); 
const Pharmacy = require('../models/Pharmacy'); 
const mongoose = require('mongoose');

// Utility function to validate ObjectId
const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Search for medicines by name and return details with price information
exports.searchMedicines = async (req, res) => {
  try {
    const { name, popular, page = 1, limit = 20 } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Perform case-insensitive search
    }

    if (popular === 'true') {
      query.isPopular = true;
    }

    // Fetch medicines based on the search query with pagination
    const medicines = await Medicine.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (medicines.length === 0) {
      return res.status(404).json({ message: "No medicines found." });
    }

    // Fetch the prices for each medicine from pharmacies
    const medicineWithPrices = await Promise.all(medicines.map(async (medicine) => {
      const pharmacies = await Pharmacy.find({
        'medicines.medicineId': medicine._id
      }).select('name address contact medicines'); // Fetch pharmacies that sell this medicine

      // Map over pharmacies and return the price information for each pharmacy
      const pharmaciesWithPrice = pharmacies.map(pharmacy => {
        const medicineInfo = pharmacy.medicines.find(m => m.medicineId.toString() === medicine._id.toString());
        return {
          pharmacyName: pharmacy.name,
          address: pharmacy.address,
          contact: pharmacy.contact,
          price: medicineInfo ? medicineInfo.price : null
        };
      });

      return {
        medicine,
        pharmacies: pharmaciesWithPrice
      };
    }));

    res.json(medicineWithPrices); // Return medicines along with pharmacy details and prices
  } catch (err) {
    console.error("Error fetching medicines:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get pharmacies that sell a specific medicine
exports.getPharmaciesByMedicine = async (req, res, next) => {
  try {
    const { medicineName } = req.query;

    if (!medicineName) {
      return res.status(400).json({ message: 'Medicine name is required' });
    }

    const medicine = await Medicine.findOne({ name: medicineName });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    const pharmacies = await Pharmacy.find({
      'medicines.medicineId': medicine._id
    }).select('name address contact');

    res.json(pharmacies);
  } catch (err) {
    console.error("Error fetching pharmacies:", err.message);
    next(err); // Pass the error to the error handling middleware
  }
};

// Get a single pharmacy by ID
exports.getPharmacyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ message: 'Invalid pharmacy ID' });
    }

    const pharmacy = await Pharmacy.findById(id);

    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    res.json(pharmacy);
  } catch (err) {
    console.error("Error fetching pharmacy:", err.message);
    next(err); // Pass the error to the error handling middleware
  }
};

// Update the price of a medicine in a pharmacy (requires authentication)
exports.updateMedicinePrice = async (req, res, next) => {
  try {
    const { pharmacyId } = req.params;
    const { medicineId, newPrice } = req.body;

    if (!validateObjectId(pharmacyId) || !validateObjectId(medicineId)) {
      return res.status(400).json({ message: 'Invalid IDs' });
    }

    const pharmacy = await Pharmacy.findById(pharmacyId);

    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    const medicineIndex = pharmacy.medicines.findIndex(m => m.medicineId.toString() === medicineId);

    if (medicineIndex === -1) {
      return res.status(404).json({ message: 'Medicine not found in this pharmacy' });
    }

    pharmacy.medicines[medicineIndex].price = newPrice;

    await pharmacy.save();

    res.json({ message: 'Medicine price updated successfully' });
  } catch (err) {
    console.error("Error updating medicine price:", err.message);
    next(err); // Pass the error to the error handling middleware
  }
};