import Joi from 'joi';

const postNotificationSchema = Joi.object({
    users: Joi.string().optional(),
    message: Joi.string().required(),
    createdAt: Joi.date().required(),
    read: Joi.boolean().optional(),
    types: Joi.string().valid('accepted', 'new feedback', 'new candidate', 'refused', 'pending').optional()
});

export { postNotificationSchema };