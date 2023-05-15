const Joi = requir("joi");

const ItemModelSizeValidation = {
    body : Joi.object().required().keys({
        size : Joi.string().empty('').pattern(new RegExp(/^((x{0,7}\s*)?large|medium|small)$/)).required().messages({
            "string.empty" : "you have to enter model size",
            "any.required" : "you have to enter model size",
            "string.pattern.base": "Please enter a valid size format (small or meduim or large or x large) in lowercase letter",
        })
    }),
};