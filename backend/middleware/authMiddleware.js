const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const requireAuth = async (req, res, next) => {
    try{
        const { authorization } = req.headers

        if(!authorization) {
            return res.status(401).json({ message: 'Authorization required' });
        }

        const token = authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Request not authorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Request not authorized' });
    }
};

module.exports = requireAuth;