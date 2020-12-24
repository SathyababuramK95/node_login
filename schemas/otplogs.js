const Sequelize = require('sequelize');
const sequelize = require('../config/db');


module.exports = sequelize.define("otplogs", {
    otpid : {
        type : Sequelize.STRING(50),
        allowNull : false,
        primaryKey : true
    },
    userid : {
        type : Sequelize.STRING(50),
        allowNull : false,
    },
    onetimepassword : {
        type : Sequelize.STRING(50),
    },
    statusflag : {
        type : Sequelize.STRING(50)
    }
},{
    timestamps: false,
});