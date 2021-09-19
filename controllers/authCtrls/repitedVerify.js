const { BadRequest } = require('http-errors');

const {sendMail} = require('../../utils')
const { User } = require('../../models');


const repitedVerify = async (req, res) => {   
    const { email } = req.body;
    const user = await User.findOne({ email });    
    
    if (!email) {
        throw new BadRequest('missing required field email')
    }

    if (!user.verify) {    
        const verifyEmail = {
            to: email,
            subject: 'Подтверждение регистрации на сайте',
            html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm Registration</a>`
        }

        await sendMail(verifyEmail);

        res.status(201).json({
            status: 'success',
            code: 201,
            html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm Registration</a>`,
            user
        })  
    }
    if (user.verify) {
        throw new BadRequest('Verification has already been passed')
    }
};

module.exports = repitedVerify;
