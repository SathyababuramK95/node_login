const Sequelize = require('sequelize');
const sequelize = require('../config/db');


module.exports = sequelize.define("users_list", {
    userid : {
        type : Sequelize.STRING(50),
        allowNull : false,
        primaryKey : true
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    emailid: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    mobilenumber: {
        type: Sequelize.STRING(11)
    },
    age : {
        type : Sequelize.STRING(15)
    },
    address : {
        type : Sequelize.STRING(15)
    }
},{
    timestamps: false,
});