//This class can be used to put static utilities i.e. Generating a number, sending email
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

module.exports.generateVerificationCode = () => {
    return Math.floor(Math.random() * 90000) + 10000;
}

module.exports.sendMail = function (toParam, subjectParam, bodyParam) {
    //settings for email
    console.log("Inside email sending method!");
    console.log(toParam);

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: 'sms.mum.mpp@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET_KEY, 
            refreshToken : process.env.CLIENT_ACCESSTOKEN
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "MarketPlace ✔ <sms.mum.mpp@gmail.com>", // sender address
        to: toParam, // list of receivers
        subject: subjectParam, // Subject line
        html: bodyParam // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

