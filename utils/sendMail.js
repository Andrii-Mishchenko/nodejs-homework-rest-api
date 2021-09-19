const sgMail = require('@sendgrid/mail');
const {InternalServerError} = require('http-errors')
// require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
    try {
        const mail = { ...data, from: 'a.mishenko2001@gmail.com' };
        await sgMail.send(mail);
        return true;
    } catch (error) {
        throw new InternalServerError(error.message);
    }
}

module.exports = sendMail;