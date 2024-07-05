const User = require('../models/User');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const assignToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, jwtSecret, { expiresIn: '1d'})
}

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;    

        const user = await User.signup(email, password);       
        const token = assignToken(user);
        
        res.status(201).send({ user, token });
    } catch (error) {
        console.error('Error registering user: ', error)
        res.status(500).send('Error registering user: ' + error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = assignToken(user);
        res.send({ token });
    } catch (error) {
        console.error('Error logging in: ', error)
        res.status(500).send('Error logging in: ' + error.message);
    }
};

exports.logout = async (req, res) => {
    const { token } = req.body;
    invalidTokens.add(token);
    res.status(200).send({ message: 'Logged out successfully'})
};