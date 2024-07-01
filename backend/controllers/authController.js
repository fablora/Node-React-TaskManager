const User = require('../models/User');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const assignToken = (_id) => {
    return jwt.sign({ userId: _id }, jwtSecret, { expiresIn: '1d'})
}

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;    

        const user = await User.signup(email, password);       
        const token = assignToken(user._id);
        
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
        const token = assignToken(user._id);
        res.send({ token });
    } catch (error) {
        console.error('Error logging in: ', error)
        res.status(500).send('Error logging in: ' + error.message);
    }
};