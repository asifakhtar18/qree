const MenuItem = require('../models/menu');


const { uploadFile } = require('../services/fileUploadService');



exports.getMenuItemes = async (req, res) => {
    const { userId } = req.query;
    try {
        const MenuItemes = await MenuItem.find({ user: userId })
            .select('-__v -user')
            .lean()
            .then((MenuItemes) =>
                MenuItemes.map((MenuItem) => ({
                    ...MenuItem,
                    price: MenuItem.price.toString(),
                }))
            );
        res.status(200).json(MenuItemes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.addMenuItem = async (req, res) => {
    const user = req.user.id;
    const file = req.file;
    try {
        if (file) {
            const imageUrl = await uploadFile(req.file);
            req.body.image = imageUrl;
        }
        const { name, category, description, price, isBestSeller, image } = req.body;
        const newMenuItem = await MenuItem.create({ user, name, category, description, price, isBestSeller, image });
        console.log(newMenuItem);
        res.status(201).json(newMenuItem);
    } catch (error) {
        const { name, message, keyValue } = error;
        if (name === 'ValidationError') {
            res.status(400).json({ error: `${keyValue} ${message}` });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
};



exports.updateMenuItem = async (req, res) => {
    try {
        const id = req.user.id;
        const file = req.file;
        if (file) {
            const imageUrl = await uploadFile(req.file);
            req.body.image = imageUrl;
        }
        const { _id: MenuItemId, name, category, description, price, isBestSeller, image } = req.body;
        const Item = await MenuItem.findById(MenuItemId);

        if (!Item) return res.status(404).json({ error: 'MenuItem not found' });

        if (Item.user.toString() !== id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            MenuItemId,
            { name, category, description, price, isBestSeller, image },

        );

        res.status(200).json(updatedMenuItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const item = await MenuItem.findById(id);
        if (!item) return res.status(404).json({ error: 'MenuItem not found' });

        if (item.user.toString() !== userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await MenuItem.findByIdAndDelete(id);
        res.status(204).json({
            message: 'MenuItem deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.toggleIsBestSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user.id;
        const item = await MenuItem.findById(id);
        if (!item) return res.status(404).json({ error: 'MenuItem not found' });

        if (item.user.toString() !== user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(id, { isBestSeller: !item.isBestSeller }, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
