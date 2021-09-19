const signup = require('./signup');
const verify = require('./verify');
const repetedVerify = require('./repitedVerify');
const login = require('./login');
const logout = require('./logout');
const updAvatar = require('./updAvatar');

module.exports = {
    signup,
    login,
    logout,
    updAvatar,
    verify,
    repetedVerify
}