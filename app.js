const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JsonWebToken = require('jsonwebtoken');
const appUtils = require('./apputils');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.use(cookieParser());

// app.use((req, res, next) => {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     let url = req.originalUrl.split('/')
//     if (url[2] && (url[2] == 'register' || url[2] == 'login')) {
//         next();
//     } else {
//         let token = req.cookies['access-token'];
//         JsonWebToken.verify(token, appUtils.jsonSecretKey, function (err, decoded) {
//             if (err) {
//                 appUtils.sendFailureResponse({ error : "invalid token"},req,res);
//                 return;
//             } else {
//                 next();
//             }
//         });
//     }
// });

require("./config/db");
require('./routes')(app);

const port = process.env.port || 8080;
app.listen(port, (req, res) => {
    console.log("server started successfully");
});