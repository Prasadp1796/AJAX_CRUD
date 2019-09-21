var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'user-email',
        pass: 'user-pass'
    }
});

