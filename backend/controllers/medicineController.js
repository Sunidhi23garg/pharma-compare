// // // // // controllers/medicineController.js
// // // // const Medicine = require('../models/Medicine');

// // // // exports.searchMedicines = async (req, res) => {
// // // //   try {
// // // //     const { name, popular } = req.query;
// // // //     let query = {};
    
// // // //     if (name) {
// // // //       query.name = { $regex: name, $options: 'i' };
// // // //     }
    
// // // //     if (popular === 'true') {
// // // //       query.isPopular = true;
// // // //     }

// // // //     const medicines = await Medicine.find(query).limit(20);
// // // //     res.json(medicines);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // };

// // // // exports.getMedicineById = async (req, res) => {
// // // //   try {
// // // //     const medicine = await Medicine.findById(req.params.id);
// // // //     if (!medicine) {
// // // //       return res.status(404).json({ error: 'Medicine not found' });
// // // //     }
// // // //     res.json(medicine);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // };

// // // // exports.createMedicine = async (req, res) => {
// // // //   try {
// // // //     const { name, description, manufacturer, dosage, category } = req.body;
// // // //     const medicine = new Medicine({
// // // //       name,
// // // //       description,
// // // //       manufacturer,
// // // //       dosage,
// // // //       category
// // // //     });
// // // //     await medicine.save();
// // // //     res.status(201).json(medicine);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // };

// // // const Medicine = require('../models/Medicine');

// // // exports.searchMedicines = async (req, res) => {
// // //   try {
// // //     const { name, popular } = req.query;
// // //     let query = {};
    
// // //     if (name) {
// // //       query.name = { $regex: name, $options: 'i' };
// // //     }
    
// // //     if (popular === 'true') {
// // //       query.isPopular = true;
// // //     }

// // //     const medicines = await Medicine.find(query).limit(20);
// // //     res.json(medicines);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };

// // // exports.getMedicineById = async (req, res) => {
// // //   try {
// // //     const medicine = await Medicine.findById(req.params.id);
// // //     if (!medicine) {
// // //       return res.status(404).json({ error: 'Medicine not found' });
// // //     }
// // //     res.json(medicine);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };

// // // exports.createMedicine = async (req, res) => {
// // //   try {
// // //     const { name, description, manufacturer, dosage, category, price } = req.body;
// // //     if (!price || price <= 0) {
// // //       return res.status(400).json({ error: 'Invalid price. Must be greater than 0.' });
// // //     }

// // //     const medicine = new Medicine({
// // //       name,
// // //       description,
// // //       manufacturer,
// // //       dosage,
// // //       category,
// // //       price, // Include price in the creation
// // //     });
// // //     await medicine.save();
// // //     res.status(201).json(medicine);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };


// // const Medicine = require('../models/Medicine');
// // const Pharmacy = require('../models/Pharmacy'); // Import Pharmacy model to access prices

// // // Search for medicines by name and return details with price information
// // exports.searchMedicines = async (req, res) => {
// //   try {
// //     const { name, popular } = req.query;
// //     let query = {};
    
// //     if (name) {
// //       query.name = { $regex: name, $options: 'i' };  // Perform case-insensitive search
// //     }
    
// //     if (popular === 'true') {
// //       query.isPopular = true;
// //     }

// //     // Fetch medicines based on the search query
// //     const medicines = await Medicine.find(query).limit(20);

// //     // Fetch the prices for each medicine from pharmacies
// //     const medicineWithPrices = await Promise.all(medicines.map(async (medicine) => {
// //       const pharmacies = await Pharmacy.find({
// //         'medicines.medicineId': medicine._id
// //       }).select('name address contact medicines'); // Fetch pharmacies that sell this medicine

// //       // Map over pharmacies and return the price information for each pharmacy
// //       const pharmaciesWithPrice = pharmacies.map(pharmacy => {
// //         const medicineInfo = pharmacy.medicines.find(m => m.medicineId.toString() === medicine._id.toString());
// //         return {
// //           pharmacyName: pharmacy.name,
// //           address: pharmacy.address,
// //           contact: pharmacy.contact,
// //           price: medicineInfo ? medicineInfo.price : null
// //         };
// //       });

// //       return {
// //         medicine,
// //         pharmacies: pharmaciesWithPrice
// //       };
// //     }));

// //     res.json(medicineWithPrices);  // Return medicines along with pharmacy details and prices
// //   } catch (err) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };




// // // // controllers/medicineController.js
// // // const Medicine = require('../models/medicines');

// // // // Controller to fetch popular medicines
// // // exports.searchMedicines = async (req, res) => {
// // //   try {
// // //     const popular = req.query.popular === 'true';  // Check if 'popular' query param is passed
// // //     const medicines = await Medicine.find({ isPopular: popular }); // Fetch medicines based on popularity
// // //     res.json(medicines); // Return the medicines
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).send('Server Error'); // Internal server error if something goes wrong
// // //   }
// // // };






// // // // Get a medicine by its ID
// // // exports.getMedicineById = async (req, res) => {
// // //   try {
// // //     const medicine = await Medicine.findById(req.params.id);
// // //     if (!medicine) {
// // //       return res.status(404).json({ error: 'Medicine not found' });
// // //     }
// // //     res.json(medicine);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };

// // // // Create a new medicine with its price information
// // // exports.createMedicine = async (req, res) => {
// // //   try {
// // //     const { name, description, manufacturer, dosage, category, price } = req.body;

// // //     // Validate price
// // //     if (!price || price <= 0) {
// // //       return res.status(400).json({ error: 'Invalid price. Price must be greater than 0.' });
// // //     }

// // //     // Create the medicine object with price included
// // //     const medicine = new Medicine({
// // //       name,
// // //       description,
// // //       manufacturer,
// // //       dosage,
// // //       category,
// // //       price,  // Include price when creating the medicine
// // //     });

// // //     await medicine.save();
// // //     res.status(201).json(medicine);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };



// const Medicine = require('../models/Medicine');
// const Pharmacy = require('../models/Pharmacy'); // Import Pharmacy model to access prices

// // Search for medicines by name and return details with price information
// exports.searchMedicines = async (req, res) => {
//   try {
//     const { name, popular } = req.query;
//     let query = {};
    
//     if (name) {
//       query.name = { $regex: name, $options: 'i' };  // Perform case-insensitive search
//     }
    
//     if (popular === 'true') {
//       query.isPopular = true;
//     }

//     // Fetch medicines based on the search query
//     const medicines = await Medicine.find(query).limit(20);

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
//     console.error(err); // Log error for debugging
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Get medicine by ID
// exports.getMedicineById = async (req, res) => {
//   try {
//     const medicine = await Medicine.findById(req.params.id);
//     if (!medicine) {
//       return res.status(404).json({ error: 'Medicine not found' });
//     }
//     res.json(medicine);
//   } catch (err) {
//     console.error(err); // Log error for debugging
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Create a new medicine
// exports.createMedicine = async (req, res) => {
//   try {
//     const { name, description, manufacturer, dosage, category, price, isPopular } = req.body;

//     if (!name || !description || !manufacturer || !dosage || !category || price == null) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     const newMedicine = new Medicine({
//       name,
//       description,
//       manufacturer,
//       dosage,
//       category,
//       price,
//       isPopular
//     });

//     await newMedicine.save();
//     res.status(201).json(newMedicine);
//   } catch (err) {
//     console.error(err); // Log error for debugging
//     res.status(500).json({ error: 'Server error' });
//   }
// };




const Medicine = require('../models/Medicine');
const Pharmacy = require('../models/Pharmacy'); // Import Pharmacy model to access prices

// Search for medicines by name and return details with price information
exports.searchMedicines = async (req, res) => {
  try {
    const { name, popular } = req.query;
    let query = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };  // Perform case-insensitive search
    }
    
    if (popular === 'true') {
      query.isPopular = true;
    }

    // Fetch medicines based on the search query
    const medicines = await Medicine.find(query).limit(20);

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
          price: medicineInfo ? medicineInfo.price : 'Price not available' // Handling missing price
        };
      });

      return {
        medicine,
        pharmacies: pharmaciesWithPrice
      };
    }));

    res.json(medicineWithPrices);  // Return medicines along with pharmacy details and prices
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while searching for medicines. Please try again later.' });
  }
};

// Get medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while fetching the medicine details. Please try again later.' });
  }
};

// Create a new medicine
exports.createMedicine = async (req, res) => {
  try {
    const { name, description, manufacturer, dosage, category, price, isPopular } = req.body;

    if (!name || !description || !manufacturer || !dosage || !category || price == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMedicine = new Medicine({
      name,
      description,
      manufacturer,
      dosage,
      category,
      price,
      isPopular
    });

    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while creating the medicine. Please try again later.' });
  }
};
