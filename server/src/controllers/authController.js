const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const OTP = require('../models/otp');
const sendEmail = require('../services/emailService');
const { generateOtp } = require('../services/otpService');
const { uploadFile } = require('../services/fileUploadService');
const { QRGenerator } = require('../services/QRGenerator');

const generateToken = (user) => {
    if (!user || !user._id) {
        throw new Error("User ID is required");
    }
    const userId = user._id.toString();
    try {
        return jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, { expiresIn: '30d' });
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};


exports.getUserDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.uploadProfilePic = async (req, res) => {
    try {

        console.log(req.file);

        res.json({ "message": "success" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
        const existingOtp = OTP.findOne({ email });
        if (existingOtp) {
            await OTP.deleteMany({ email });
        }
        const otp = generateOtp();
        await OTP.create({ email, otp, });
        await sendEmail(email, 'Email Verification', `Your OTP is: ${otp}`);
        res.status(200).json({ message: 'OTP sent to your email. Please verify your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const otpDoc = await OTP.findOne({ email, otp });
        if (!otpDoc) return res.status(400).json({ message: 'Invalid OTP' });
        const user = await User.create({ email, verified: true });
        let qr = null;
        if (user._id) {
            const qrCode = await QRGenerator(user._id.toString());
            const originalname = `${user._id.toString()}.png`;
            const url = await uploadFile({
                originalname,
                buffer: qrCode
            });

            qr = url;
        }

        if (qr != null) {
            user.qrCode = qr;
            await user.save();
        }


        await OTP.deleteMany({ email });
        const token = generateToken(user);
        res.status(201).json({ message: 'Email verified successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const { restaurantName, password, phoneNumber, address, ownerName } = req.body;

        const file = req.file;
        const user = await User.findById(req?.user?.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (restaurantName) user.restaurantName = restaurantName;
        if (password) user.password = password;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (address) user.address = address;
        if (ownerName) user.ownerName = ownerName;
        if (file) {
            const profilePicUrl = await uploadFile(req.file);
            user.profilePic = profilePicUrl;
        }
        await user.save();
        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = bcrypt.compare(password, user?.password);
        console.log(isMatch);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = generateOtp();
        await OTP.create({ email, otp });

        await sendEmail(email, 'Password Reset', `Your OTP for password reset is: ${otp}`);

        res.json({ message: 'Password reset OTP sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const otpDoc = await OTP.findOne({ email, otp });
        if (!otpDoc) return res.status(400).json({ message: 'Invalid OTP' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        await OTP.deleteOne({ _id: otpDoc._id });

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
