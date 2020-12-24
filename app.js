const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JsonWebToken = require('jsonwebtoken');
const appUtils = require('./apputils');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb' }));

app.use((req, res, next) => {
    let url = req.originalUrl.split('/')
    if (url[2] && (url[2] == 'register' || url[2] == 'login')) {
        next();
    } else {
        let token = req.cookies.access_token;
        JsonWebToken.verify(token, appUtils.jsonSecretKey, function (err, decoded) {
            if (err) {
                appUtils.sendFailureResponse({ error : "invalid token"},req,res);
                return;
            } else {
                next();
            }
        });
    }
});

require("./config/db");
require('./routes')(app);

const port = process.env.port || 8080;
app.listen(port, (req, res) => {
    console.log("server started successfully");
});