import Joi from 'joi';

const postNotificationSchema = Joi.object({
    message: Joi.string().required(),
    types: Joi.string().valid('accepted', 'new feedback', 'new candidate', 'refused', 'pending').optional()
});

export { postNotificationSchema };