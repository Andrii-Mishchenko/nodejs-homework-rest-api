// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {BadRequest} = require('http-errors')
const { User } = require('../../models');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
        throw new BadRequest('Email or password is wrong');
    }
    if (!user.verify) {
        throw new BadRequest('Email is not confirmed');
    }

    // const hashPassword = user.password;
    // const compareResult = bcrypt.compareSync(password, hashPassword);

    const payload = {
        id: user._id
    }

    const { SECRET_KEY } = process.env;
    
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, {token})
   
    return res.status(200).json({
        status: "OK",
        code: 200,
        ResponseBody: {
          token: token,
          user: {
            email: email,
            subscription: "starter",
          },
        },
    });
}

module.exports = login;