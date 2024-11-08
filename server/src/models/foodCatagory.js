const mongoose = require('mongoose');

const foodCatagorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
});


const FoodCatagory = mongoose.model('FoodCatagory', foodCatagorySchema);

module.exports = FoodCatagory;