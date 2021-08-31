const {Contact} = require('../../models');

const updateStatusContact = async (req, res, next) => {
    try {     
        const { contactId } = req.params;
        const { favorite } = req.body;
        const updateContact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});

        if (!updateContact) {
            return res.status(404).json({
                "message": "Not found"
            })
        }

        res.status(200).json({
            updateContact
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports = updateStatusContact