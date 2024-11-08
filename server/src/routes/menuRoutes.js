const express = require('express');
const multer = require('multer');
const { addMenuItem, getMenuItemes, updateMenuItem, deleteMenuItem, toggleIsBestSeller } = require('../controllers/menuController');
const protect = require('../middleware/auth');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', getMenuItemes);
router.post('/add-item', protect, upload.single('image'), addMenuItem);
router.patch('/update-item', protect, upload.single('image'), updateMenuItem);
router.patch('/toggle-isBestSeller/:id', protect, toggleIsBestSeller);
router.delete('/delete-item/:id', protect, deleteMenuItem);

module.exports = router;
