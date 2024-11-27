const express = require('express');
const router = express.Router();
const multer = require('multer');

const authController = require('../controllers/authController');
const protect = require('../middleware/auth');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get('/me', protect, authController.getUserDetails);
router.post('/register', authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/update-user', protect, upload.single('profilePicture'), authController.updateUserDetails);
router.post('/reset-password', authController.resetPassword);
router.post('/upload', authController.uploadProfilePic);

module.exports = router;