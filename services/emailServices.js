var nodemailer = require('nodemailer');

async function sendEmail(params, callback) {
    const transporter = nodemailer.createTransport({
       service:"gmail",
        auth: {
            user: 'codemagic943@gmail.com',
            pass: 'kcbd obfr fwdk oxni'
        },
    });

    // Ensure mailOptions is inside the function so it can access params
    var mailOptions = {
        from: 'codemagic943@gmail.com',
        to: params.email, 
        subject: params.subject,
        text: params.body,
    };

    transporter.sendMail(mailOptions, function (error, info) { // Fix: sendMail instead of sendEmail
        if (error) {
            return callback(error);
        } else {
            return callback(null, info.response);
        }
    });
}

module.exports = {
    sendEmail
};
