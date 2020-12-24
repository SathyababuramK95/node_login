module.exports = function(app) {
    const user = require('./services/user');

    app.post('/users/register', user.addNewUser);
    app.post('/users/login', user.loginUser);
    app.post('/users/modify', user.modifyUser);
    app.get('/users/getdetail/:userid', user.getUserDetail);
    app.post('/users/forgetpassword', user.forgotPassword);
    app.post('/users/resetpassword', user.resetPassword);

}