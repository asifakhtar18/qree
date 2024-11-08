const express = require('express');
const { getFoodCatagory, addFoodCatagory, updateFoodCatagory, deleteFoodCatagory } = require('../controllers/foodCatagoryController');

const protect = require('../middleware/auth');

const router = express.Router();

router.get('/', getFoodCatagory);
router.post('/add', protect, addFoodCatagory);
router.put('/update', protect, updateFoodCatagory);
router.delete('/delete/:id', protect, deleteFoodCatagory);

module.exports = router;
