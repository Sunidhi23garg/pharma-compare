const Medicine = require('../models/Medicine');
const Pharmacy = require('../models/Pharmacy');

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
