const User = require('../schemas/users');
const appUtils = require('../apputils'); 
const md5 = require('md5');
const jsonWebToken = require('jsonwebtoken');
// const appConstants = require('../config/constants');
const uniqueId = require('uniqid');
const mailer = require('./mailer');
const otpLogs = require('../schemas/otplogs');
const { Op } = require('sequelize');
const otplogs = require('../schemas/otplogs');

exports.addNewUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.mobilenumber || !req.body.password || !req.body.emailid) {
            return appUtils.sendFailureResponse({ error: 'Invalid Data' }, req, res);
        }

        let createObj = {};
        createObj.userid = uniqueId();
        createObj.username = req.body.username;
        createObj.mobilenumber = req.body.mobilenumber;
        createObj.password = encryptPassword(req.body.password);
        createObj.emailid = req.body.emailid;
        createObj.age = req.body.age;
        createObj.address = req.body.address;

        let user = await User.findOrCreate({ where: { 
            [ Op.or ]  : [{ username : req.body.username },{ mobilenumber : req.body.mobilenumber },{ emailid : req.body.emailid }]
        }, defaults: createObj 
    })

        if (user && !user[1]) {
            return appUtils.sendFailureResponse({ error: "user already exisiting" }, req, res);
        } else {
            return appUtils.sendSuccessResponse({ responseData: user[0] }, res);
        }

    } catch (error) {
        return appUtils.sendFailureResponse({ error: "Error while saving new user" }, req, res, error);
    }
}

exports.loginUser = async (req, res) => {
    try {

        if (!req.body.username || !req.body.password) {
            return appUtils.sendFailureResponse({ error: 'Invalid Data' }, req, res);
        }

        let searchCriteria = {};
        searchCriteria.username = req.body.username;
        searchCriteria.password = encryptPassword(req.body.password);

        let userData = await User.findOne({
            where: searchCriteria
        });
        if (userData && userData.userid) {
            jsonWebToken.sign(req.body.username, appUtils.jsonSecretKey, {}, (error, sessionToken) => {
                if (error) {
                    return appUtils.sendFailureResponse({ error: "error while generating token" }, req, res, error);
                }
                res.cookie('access-token',sessionToken);
                return appUtils.sendSuccessResponse({ responseData: userData }, res);
            });
        } else {
            return appUtils.sendFailureResponse({ error: 'User not found' }, req, res);
        }
    } catch (error) {
        return appUtils.sendFailureResponse({ error: "Error while login" }, req, res, error);
    }
}

exports.modifyUser = async (req, res) => {

    try {

        if (!req.body.userid) {
            return appUtils.sendFailureResponse({ error: 'Invalid Data' }, req, res);
        }

        if (!req.body.emailid && !req.body.password && !req.body.age && !req.body.address) {
            return appUtils.sendFailureResponse({ error: 'No data available to update user' }, req, res);
        }

        let updateObj = {};
        if (req.body.emailid) {
            updateObj.emailid = req.body.emailid;
        }
        if (req.body.password) {
            updateObj.password = encryptPassword(req.body.password);;
        }
        if (req.body.age) {
            updateObj.age = req.body.age;
        }
        if (req.body.address) {
            updateObj.address = req.body.address;
        }

        let userUpdate = await User.update(updateObj, { where: { userid: req.body.userid } });

        return appUtils.sendSuccessResponse({ responseData: userUpdate }, res);

    } catch (error) {
        return appUtils.sendFailureResponse({ error: "Error while updating user details" }, req, res, error);
    }
}

exports.getUserDetail = async (req, res) => {

    try {
        const userId = req.body.userid || null;

        if (!userId) {
            return appUtils.sendFailureResponse({ error: 'invalid userid' }, req, res);
        }

        let userDetail = await User.findOne({
            where: {
                userid: userId
            }
        })

        if (userDetail && userDetail.userid) {
            return appUtils.sendSuccessResponse({ responseData: userDetail }, res);
        } else {
            return appUtils.sendFailureResponse({ error: 'User not found for this userid' }, req, res);
        }

    } catch (error) {
        return appUtils.sendFailureResponse({ error: "Error while fetching user details" }, req, res, error);
    }
}


exports.forgotPassword = async (req,res)=>{

    try {

        const emailId = req.body.emailid || null;

        if (!emailId) {
            return appUtils.sendFailureResponse({ error: 'invalid emailId' }, req, res);
        }

        let userDetail = await User.findOne({
            where: {
                emailid: emailId
            }
        })

        if (userDetail && userDetail.userid) {
            saveOtpDetail(req,res,userDetail);
        } else {
            return appUtils.sendFailureResponse({ error: 'User not found for this emailId' }, req, res);
        }


    } catch (error) {
        return appUtils.sendFailureResponse({ error: "Error while fetching user details" }, req, res, error);
    }

}

const saveOtpDetail = async (req,res,userDetail) => {

    try {
        if(userDetail && userDetail.userid){
        
            let otp = Math.floor(1000 + Math.random() * 9000);
            req.body.otp = otp;
            req.body.emailid = userDetail.emailid;

            let logs = await otpLogs.create({
                userid : userDetail.userid,
                onetimepassword : otp,
                otpid : uniqueId('id'),
                statusflag : 'A'
            })
    
            if(logs){
                mailer.sendOtpEmail(req,res,(err)=>{
                    if(err){
                        return appUtils.sendFailureResponse({ error: "Error while sending  otp details" }, req, res, err);
                    }
                    return appUtils.sendSuccessResponse({ successMessage : "OTP sent successfully" }, res);
                });
            }
            
        }
        
    } catch (error) {
        return appUtils.sendFailureResponse({ error: "Error while saving  otp details" }, req, res, error);
    }
    
}

exports.resetPassword = async (req,res) => {
    try {

        if(!req.body.onetimepassword || !req.body.password){
            return appUtils.sendFailureResponse({ error: "Invalid Data" }, req, res)
        }

        let otpDoc = await otpLogs.findOne({ where : { onetimepassword : req.body.onetimepassword , statusflag : 'A'}});

        if(otpDoc && otpDoc.otpid){
            let otpUpdate = await otplogs.update({ statusflag : 'D'}, { where: { otpid: otpDoc.otpid } });

            if(otpUpdate){
                let userUpdateDoc = await User.update({ password : encryptPassword(req.body.password)}, { where: { userid: otpDoc } });

                if(userUpdateDoc){
                    return appUtils.sendSuccessResponse({ successMessage : "Password changed Successfully" }, res);
                }
            }
        }else{
            return appUtils.sendFailureResponse({ error: "Otp Does not match" }, req, res)
        }
        
    } catch (error) {
        return appUtils.sendFailureResponse({ error: "Error while verifying user Otp" }, req, res,error)
    }
}


const encryptPassword = (password) => {
    if (!password) {
        return password;
    }
    return md5(password);
}
