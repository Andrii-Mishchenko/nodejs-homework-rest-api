const { boolean } = require('joi');
const {Contact} = require('../../models');

const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const pages = await Contact.find({});
    const contacts = await Contact.find({}, '', {skip, limit: +limit});
    res.json({
      status: 'success',
      code: 200,
      data: {
        total: pages.length,
        pages: Math.ceil(pages.length / limit),
        contacts
      }      
    });
  } catch (error) {
    next(error);
  }

  
}

module.exports = listContacts;