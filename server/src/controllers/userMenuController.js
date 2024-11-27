
const Menu = require('../models/menu');
const Category = require('../models/foodCatagory');
const User = require('../models/user');


exports.getMenuItemes = async (req, res) => {
    const { id } = req.params;
    try {

        const user = await User.findById(id).select('-__v -password').lean();
        if (!user) return res.status(404).json({ error: 'User not found' });
        const MenuItems = await Menu.find({ user: id })
            .select('-__v -user')
            .lean()
            .then((MenuItemes) =>
                MenuItemes.map((MenuItem) => ({
                    ...MenuItem,
                    price: MenuItem.price.toString(),
                }))
            );

        const catagories = await Category.find({ userId: id })
            .select('-__v -user')
            .lean()



        const categoryNames = catagories.map(category => category.name);

        const resturantData = {
            MenuItems,
            categoryNames,
            user
        }

        res.status(200).json(resturantData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}