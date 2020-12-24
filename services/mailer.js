const nodeMailer = require('nodemailer')



const sendOtpEmail = (req, res, otpCallback) => {

    const EmailConfig = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ksathyababuram95@gmail.com",
            pass: ""
        },
        secureConnection : true,
    })

    const mailOptions = {
        from: 'ksathyababuram95@gmail.com',
        to: '',
        subject: 'Reset password - Your OTP',
        text: req.body.otp
    };

    EmailConfig.sendMail(mailOptions,(error, info) => {
        if (error) {
            otpCallback(error);
            return;
        }
        otpCallback(null, info);
        return;
    });
}



exports.sendOtpEmail = sendOtpEmail;