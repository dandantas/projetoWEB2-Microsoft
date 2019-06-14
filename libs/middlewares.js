let bodyParser = require('body-parser'),
    path = require('path'),
    express = require('express'),
    cookieParser = require('cookie-parser');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    
    app.use(express.static('public'));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'hbs');
    
    
}
