const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const requireAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;        

        if(!authorization) {
            return res.status(401).json({ message: 'Authorization required' })
        }

        const token = authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);        

        const user = await User.findById(userId);

        if(!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied'});
        }

        req.user == user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Request not authorized' });
    }
};

module.exports = requireAdmin;