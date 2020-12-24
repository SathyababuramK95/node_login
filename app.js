const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JsonWebToken = require('jsonwebtoken');
const jwt_secret_key = "JSONWEBTOKEN_SECRETKEY";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb' }));

// app.use((req,res,next)=>{
//     let url = req.originalUrl.split('/')
//     let token = req.headers.token;
//     if(url[2] && (url[2] == 'register' || url[2] == 'login')){
//       next();
//     }else{
//       JsonWebToken.verify(token, jwt_secret_key, function(err, decoded) {
//         if(err){
//           res.send('Invalid  token');
//         }else{
//             next();
//         }
//       });
//     } 
// });

require("./connection/db");
require('./routes')(app);

const port = process.env.port || 8080;
app.listen(port, (req, res) => {
    console.log("server started successfully");
});