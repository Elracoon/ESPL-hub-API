import Joi from 'joi'

const postSchemaUser = Joi.object({
    username: Joi.string().required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    projects: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        status: Joi.string().valid("in progress", "finish", "candidate", "publish").required()
    })),
    status: Joi.string().valid("company", "association", "student").optional(),
    competences: Joi.string().valid("developpement", "design", "marketing", "communciation", "ux/ui").optional(),
})

const patchSchemaUser = Joi.object({
    username: Joi.string().optional(),
    lastName: Joi.string().optional(),
    firstName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    status: Joi.string().valid("company", "association", "student").optional(),
    competences: Joi.string().valid("developpement", "design", "marketing", "communciation", "ux/ui").optional(),
})

const postSchemaLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

export { postSchemaUser, postSchemaLogin }