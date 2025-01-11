const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const Medicine = require('../models/Medicine');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    const favoriteMedicines = await Medicine.find({ '_id': { $in: user.favorites } });
    res.json(favoriteMedicines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a medicine to the favorites list
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(req.body.medicineId)) {
      user.favorites.push(req.body.medicineId);
      await user.save();
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove a medicine from the favorites list
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.id
    );
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
