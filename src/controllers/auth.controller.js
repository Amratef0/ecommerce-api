const User = require('../models/user.model');
const Blacklist = require('../models/blacklist.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../config/email');
const { welcomeEmail, forgotPasswordEmail } = require('../templates/email.templates');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

sendEmail(user.email, 'Welcome to Our Store! 🎉', welcomeEmail(user.name))
    .catch(err => console.log('Email error:', err.message));
    
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });

    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        await Blacklist.create({ token });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Save token in database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();

        // Send email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendEmail(user.email, 'Reset Your Password 🔑', forgotPasswordEmail(user.name, resetUrl));

        res.status(200).json({ message: 'Email sent successfully' });

    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find user by token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, logout, forgotPassword, resetPassword };