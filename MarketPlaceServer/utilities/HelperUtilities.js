//This class can be used to put static utilities i.e. Generating a number, sending email
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

module.exports.generateVerificationCode = () => {
    return Math.floor(Math.random() * 90000) + 10000;
}

module.exports.sendMail = function (toParam, subjectParam, textParam) {
    //settings for email
    console.log(toParam);

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: 'sms.mum.mpp@gmail.com',
            clientId: '399906134205-5jfp5f1kh1qsrhsupci9ibelruf8ti3o.apps.googleusercontent.com',
            clientSecret: '9poeW76ZAklmLlVSGW4c7Lsz', 
            refreshToken : '1/j-UdNbImO4hsvSgG6lsr0XqwrUKn0h00M7Rpa3tVysI'
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
        to: "aimalkhanofficial@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world ✔", // plaintext body
        html: "<b>Hello world ✔</b>" // html body
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

