const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const addUserValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: JoiPassword.string().min(6).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).noWhiteSpaces().required(),
});

const addHomeValidation=Joi.object().keys({
    title:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().integer().required(),
    // price_After_Tax:,
    photos:Joi.string(),
    address:Joi.string().required(),
    country:Joi.string().required(),
    state:Joi.string().required(),
    city:Joi.string().required(),
    zip:Joi.number().integer().required(),
    size:Joi.number().integer().required(),
    rooms:Joi.number().integer().required(),
    badrooms:Joi.number().integer().required(),
    bathrooms:Joi.number().integer().required(),
    garages:Joi.boolean(),
    garage_size:Joi.string().required(),
    basement:Joi.string().required(),
    roofing:Joi.string().required(),
    floor_no:Joi.number().integer().required(),
    available_from:Joi.date().required(),
    interior_details:Joi.string().required(),
    outdoor_details:Joi.string().required(),
    utilities:Joi.string().required(),
    other_features:Joi.string().required(),
    publicId:Joi.string(),
})

module.exports={
   addUserValidation,
   addHomeValidation
}