let bodyParser = require('body-parser'),
    path = require('path'),
    express = require('express');

module.exports = app => {
    app.use(bodyParser.urlencoded({extended: true}));

    
    app.use(express.static('public'));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'hbs');
    
    
}
