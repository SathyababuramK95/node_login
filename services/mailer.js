const nodeMailer = require('nodemailer')



const sendOtpEmail = (req, res, otpCallback) => {

    let otpTosend = req.body.otp;
    let receiverMail = req.body.emailid;

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
        to: receiverMail,
        subject: 'Reset password - Your OTP',
        //text: otpTosend,
        html : getOtpTemplate(otpTosend)
        
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


function getOtpTemplate(otpTosend) {

    return '<html> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <title>Demystifying Email Design</title> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <style type="text/css"> a[x-apple-data-detectors] { color: inherit !important; } </style> </head> <body style="margin: 0; padding: 0;"> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="padding: 20px 0 30px 0;"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;"> <tr> <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;"> <img src="https://image.freepik.com/free-vector/security-otp-one-time-password-smartphone-shield_9904-104.jpg" alt="Creating Email Magic." width="300" height="230" style="display: block;" /> </td> </tr> <tr> <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;"> <tr> <td style="color: #153643; font-family: Arial, sans-serif;"> <h1 style="font-size: 24px; margin: 0;">Please find your OTP</h1> </td> </tr> <tr> <td style="color: #89a1aa; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;"> <h2 style="margin: 0;text-align:center">'+ otpTosend +'</h2> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html>' ;
    
}



exports.sendOtpEmail = sendOtpEmail;