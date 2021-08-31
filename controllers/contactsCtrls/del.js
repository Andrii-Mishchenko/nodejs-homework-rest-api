const {Contact} = require('../../models');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    
    const deletedContact = await Contact.findByIdAndDelete(contactId);
 
    if (!deletedContact) {
      return res.status(404).json({
        "message": "Not found"
      })
    }

    res.status(200).json({
      "message": "contact deleted",
      deletedContact
    })
  }
  catch (error) {
    next(error)
  }
}

module.exports = removeContact
