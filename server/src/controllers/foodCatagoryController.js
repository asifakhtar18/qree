const foodCatagory = require('../models/foodCatagory');
const { capitalizeFirstLetter } = require('../utils/helper');



exports.getFoodCatagory = async (req, res) => {
    const userId = req.query.userId;
    try {
        const data = await foodCatagory.find({ userId });
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.addFoodCatagory = async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;
    const lowerCaseName = name.toLowerCase();

    try {
        const catagory = await foodCatagory.findOne({ userId, name: { $regex: new RegExp(`^${lowerCaseName}$`, 'i') } });
        if (catagory) {
            return res.status(400).json({ error: 'Food catagory already exists' });
        }

        const newFoodCatagory = await foodCatagory.create({ userId, name });
        res.status(201).json(newFoodCatagory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


exports.updateFoodCatagory = async (req, res) => {
    const userId = req.user.id;
    const { foodCatagoryId, name } = req.body;
    try {
        const catagory = await foodCatagory.findById(foodCatagoryId);
        if (!catagory) {
            return res.status(404).json({ error: 'Food catagory not found' });
        }
        if (catagory.userId.toString() !== userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const updatedFoodCatagory = await foodCatagory.findByIdAndUpdate(foodCatagoryId, { name }, { new: true });
        res.status(200).json(updatedFoodCatagory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


exports.deleteFoodCatagory = async (req, res) => {
    const userId = req.user.id;
    const foodCatagoryId = req.params.id;
    try {
        const catagory = await foodCatagory.findById(foodCatagoryId);
        if (!catagory) {
            return res.status(404).json({ error: 'Food catagory not found' });
        }
        if (catagory.userId.toString() !== userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await foodCatagory.findByIdAndDelete(foodCatagoryId);
        res.status(200).json({ message: 'Food catagory deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}