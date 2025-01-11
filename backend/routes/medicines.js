const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

router.get('/', medicineController.searchMedicines);  

router.get('/:id', medicineController.getMedicineById);

router.post('/', medicineController.createMedicine);

module.exports = router;
