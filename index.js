let express = require('express'),
    consign = require('consign'),
    app = express();

    consign()
        .include('./libs/middlewares.js')
        .then('./routes')
        .then('./libs/boot.js')
        .into(app);
        