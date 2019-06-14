const mongoose = require("mongoose");

var Schema = require('mongoose').Schema;

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const users = module.exports = mongoose.model('users', userSchema);