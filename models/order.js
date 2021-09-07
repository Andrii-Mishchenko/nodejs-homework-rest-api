const { Schema, model, Types } = require('mongoose');
const Joi = require('joi');

const orderSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
      type: Types.ObjectId,
        ref: 'user',
      required: true,
    }

}, { versionKey: false, timestamps: true });

const joiOrderSchema = Joi.object({
    name: Joi.string().required(),
})

const Order = model('order', orderSchema);

module.exports = {
    Order,
    joiOrderSchema
}