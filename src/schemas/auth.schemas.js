import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required().min(3),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords must match',
        }),
});

export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required().min(3),
});