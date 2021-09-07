const express = require('express');
const router = express.Router();

const { addOrder, getAll } = require('../../controllers/orderCtrls');

const { joiOrderSchema } = require('../../models/order')
const { validation, controllerWrapper, authenticate } = require('../../middlewares');

const orderValidationMiddleware = validation(joiOrderSchema)

router.post('/', controllerWrapper(authenticate), orderValidationMiddleware, controllerWrapper(addOrder));
router.get('/', controllerWrapper(authenticate), getAll);

module.exports = router;