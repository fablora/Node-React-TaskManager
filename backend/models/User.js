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
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}();:'",.<>?_\\\-+=|/~`])[A-Za-z\d!@#$%^&*[\]{}();:'",.<>?_\\\-+=|/~`]{6,}$/;
                return regex.test(v) && !/\s/.test(v);
            },
            message: props => `${props.value} is not a valid password. It must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and no spaces.`
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    } 
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema)

module.exports = User;