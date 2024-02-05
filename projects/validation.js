import Joi from 'joi';

const postProjectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    projectManager: Joi.string().required(),
    createdAt: Joi.date().required(),
    competences: Joi.string().valid('developpement', 'design', 'marketing', 'communciation', 'ux/ui').required(),
    members: Joi.string().optional()
});

const updateProjectSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    projectManager: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    competences: Joi.string().valid('developpement', 'design', 'marketing', 'communciation', 'ux/ui').optional(),
    members: Joi.string().optional()
});

export { postProjectSchema, updateProjectSchema };