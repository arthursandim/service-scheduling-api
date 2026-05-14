import Joi from 'joi';

const schema = Joi.object({
    customer: Joi.string().required(),
    dateTime: Joi.date().required(),
    serviceType: Joi.string().required()
})

export default schema