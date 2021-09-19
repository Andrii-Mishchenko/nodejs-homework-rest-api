const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4 } = require('uuid');

const {sendMail} = require('../../utils')
const { User } = require('../../models');
const avatarsDir = path.join(__dirname, '../../', 'public/avatars');

const signup = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw new Conflict('Email in use')
    }

    const defaultAvatar = gravatar.url(req.body.email, {}, true);
  
    
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({ email, password: hashPassword, avatarURL: defaultAvatar, verifyToken: v4()});

    // // второй способ:
    // const newUser = new User({ email });
    // newUser.setPassword(password);
    // await newUser.save();
    
    const dirPath = path.join(avatarsDir, String(newUser._id));
    await fs.mkdir(dirPath);

    const { verifyToken } = newUser;
    const verifyEmail = {
        to: email,
        subject: 'Подтверждение регистрации на сайте',
        html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm Registration</a>`
    }

    await sendMail(verifyEmail);

    res.status(201).json({
        status: 'success',
        code: 201,
        newUser,
        html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm Registration</a>`
    })    
};

module.exports = signup;
