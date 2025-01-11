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
