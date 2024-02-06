import Joi from 'joi';

const postProjectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    competences: Joi.string().valid('developpement', 'design', 'marketing', 'communciation', 'ux/ui').optional(),
    members: Joi.string().optional()
});

const updateProjectSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    competences: Joi.string().valid('developpement', 'design', 'marketing', 'communciation', 'ux/ui').optional(),
    members: Joi.string().optional()
});

export { postProjectSchema, updateProjectSchema };