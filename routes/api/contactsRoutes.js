const express = require('express')
const router = express.Router()

const { joiContactSchema } = require('../../models/contact')
const { validation, controllerWrapper } = require('../../middlewares');
const {contactsCtrls} = require('../../controllers')

const validationMiddleware = validation(joiContactSchema)

// router.get('/', contactsCtrls.listContacts);
router.get('/', controllerWrapper(contactsCtrls.listContacts));

router.get('/:contactId', contactsCtrls.getContactById);

// router.post('/', validationMiddleware, contactsCtrls.addContact);
router.post('/', validationMiddleware, controllerWrapper(contactsCtrls.addContact));

router.delete('/:contactId', contactsCtrls.removeContact);

router.put('/:contactId', validationMiddleware, contactsCtrls.updateContact);

// router.patch('/:contactId/favorite', contactsCtrls.updateStatusContact);
router.patch('/:contactId', controllerWrapper(contactsCtrls.updateStatusContact));

module.exports = router
