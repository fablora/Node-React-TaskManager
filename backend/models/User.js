const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => '${props.value} is no a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(v) && !/\s/.test(v);
            },
            message: props => '${props.value} is not a valid password. It must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and no spaces.It must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and no spaces.'
        }
    } 
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema)

module.exports = User;