const mongoose = require('mongoose')

const schema = mongoose.Schema;

const user = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model('users', user)