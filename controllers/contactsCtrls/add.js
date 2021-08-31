const {Contact} = require('../../models');

const addContact = async (req, res, next) => {
  try {
    const newContact  = await Contact.create(req.body);

    res.status(201).json({
      newContact 
    })
  }

  catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = addContact;