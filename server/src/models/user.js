const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    restaurantName: { type: String, },
    ownerName: { type: String, },
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    profilePic: { type: String },
    phoneNumber: { type: String, },
    address: { type: String, },
    isVerified: { type: Boolean, default: false },
    qrCode: { type: String, },
});

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS, 10));
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        console.error('Password comparison error');
        return false;
    }
};
module.exports = mongoose.model('User', userSchema);