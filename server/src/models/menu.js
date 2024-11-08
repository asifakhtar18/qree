const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    isBestSeller: { type: Boolean, default: false },
    image: { type: String, match: /^https?:\/\// },
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;