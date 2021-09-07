const bcrypt = require('bcryptjs');
const {Conflict} = require('http-errors')
const { User } = require('../../models');

const signup = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw new Conflict('Email in use')
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({ email, password: hashPassword });

    // // второй способ:
    // const newUser = new User({ email });
    // newUser.setPassword(password);
    // await newUser.save();

    res.status(201).json({
        status: 'success',
        code: 201,
        newUser
    })    
};

module.exports = signup;