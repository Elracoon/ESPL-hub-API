const schemaProject = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    projectManager: Joi.string(),
    createdAt: Joi.date().iso().required(),
    members: Joi.array().items(Joi.string()).required()
})