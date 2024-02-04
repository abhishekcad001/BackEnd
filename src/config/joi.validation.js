const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const addUserValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: JoiPassword.string().min(6).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).noWhiteSpaces().required(),
});
module.exports={
   addUserValidation
}