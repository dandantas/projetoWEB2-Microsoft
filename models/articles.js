const mongoose = require("mongoose");

var Schema = require('mongoose').Schema;

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const articles = module.exports = mongoose.model('articles', articleSchema);