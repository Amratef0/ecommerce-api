const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Blacklist = require('../models/blacklist.model');

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            // Check if token is blacklisted
            const isBlacklisted = await Blacklist.findOne({ token });
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Token is no longer valid, please login again' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }

    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { protect, authorizeAdmin };