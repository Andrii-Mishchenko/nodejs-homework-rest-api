const express = require('express');
const router = express.Router();

const { authCtrls } = require('../../controllers');

const { joiUserSchema } = require('../../models/user')
const { validation, controllerWrapper, authenticate } = require('../../middlewares');

const validationMiddleware = validation(joiUserSchema)

router.post('/signup', validationMiddleware, controllerWrapper(authCtrls.signup));

router.post('/login', validationMiddleware, controllerWrapper(authCtrls.login));

router.get('/logout', controllerWrapper(authenticate), controllerWrapper(authCtrls.logout));

module.exports=router