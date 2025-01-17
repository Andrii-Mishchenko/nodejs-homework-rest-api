const { Order } = require('../../models');

const getAll = async (req, res) => {

    const result = await Order.find({ owner: req.user._id }).populate('owner', '_id email');
    res.status(200).json({
      status: "success",
        code: 200,
        data: {
            result,
        }, 
    })
}

module.exports = getAll