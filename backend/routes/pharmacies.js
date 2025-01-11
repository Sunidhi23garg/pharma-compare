// // routes/pharmacies.js
// const express = require('express');
// const router = express.Router();
// const pharmacyController = require('../controllers/pharmacyController');
// const auth = require('../middleware/auth');

// router.get('/', pharmacyController.getPharmaciesByMedicine);
// router.get('/:id', pharmacyController.getPharmacyById);
// router.put('/:pharmacyId/medicines', auth, pharmacyController.updateMedicinePrice);

// module.exports = router;
const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
const auth = require('../middleware/auth');

router.get('/', (req, res, next) => { 
    pharmacyController.getPharmaciesByMedicine(req, res, next); 
});

router.get('/byMedicine', (req, res, next) => {
    const medicineName = req.query.medicineName; 
    pharmacyController.getPharmaciesByMedicine(medicineName, req, res, next);
});

router.get('/:id', pharmacyController.getPharmacyById);
router.put('/:pharmacyId/medicines', auth, pharmacyController.updateMedicinePrice);

module.exports = router;