const User = require('../models/User');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Username already registered');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ email, password: hashedPassword});
        await user.save();
        const token = jwt.sign({ userId: user._id }, jwtSecret)
        res.status(201).send({ user, token });
    } catch (error) {
        console.error('Error registering user: ', error)
        res.status(500).send('Error registering user: ' + error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Invalid credencials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (error) {
        console.error('Error logging in: ', error)
        res.status(500).send('Error logging in: ' + error.message);
    }
};