const User = require('./models/User');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword});
    await user.save();
    res.status(201).send(user);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credencials');
    }
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.send({ token });
};