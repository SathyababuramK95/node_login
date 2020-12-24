const nodeMailer = require('nodemailer')



const sendOtpEmail = (req, res, otpCallback) => {

    const EmailConfig = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ksathyababuram95@gmail.com",
            pass: "SathyaBabu12#"
        },
        secureConnection : true,
    })

    const mailOptions = {
        from: 'ksathyababuram95@gmail.com',
        to: 'rvelmurugan1996@gmail.com',
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