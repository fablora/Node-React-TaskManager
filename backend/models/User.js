const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail, isStrongPassword} = require('validator');
const ProjectAssignment = require('./ProjectAssignment');
const TaskAssignment = require('./TaskAssignment');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    } 
}, {
    timestamps: true
});
// Static Registration
userSchema.statics.signup = async function (email, password) {

    // Validate
    if (!email || !password) {
        throw Error('Please fill all the fields');
    }
    if (!isEmail(email)) {
        throw Error('The email must be valid');
    }
    if (!isStrongPassword(password)) {
        throw Error('The password must be at least 6 characters long and contain at least one special symbol, one number, one uppercase and one lowercase letter');
    }
    
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already registered');
    }
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });
    return user;

}

// Static Login
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Please fill all the fields')
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Username not found');
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) {
        throw Error('Incorrect password');
    }

    return user
    
}

userSchema.pre('remove', async function (next) {
    await ProjectAssignment.deleteMany({ userId: this_.id });
    await TaskAssignment.deleteMany({ userId: thuis._id });
    next();
});

const User = mongoose.model('User', userSchema)

module.exports = User;