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
    // title:,
    // description:,
    // price:,
    // price_After_Tax:,
    // photos:,
    // address:,
    // country:,
    // state:,
    // city:,
    // zip:,
    // size:,
    // rooms:,
    // badrooms:,
    // bathrooms:,
    // garages:,
    // garage_size:,
    // basement:,
    // roofing:,
    // floor_no:,
    // available_from:,
    // interior_details:,
    // outdoor_details:,
    // utilities:,
    // other_features:,
    // publicId:,
})

module.exports={
   addUserValidation,
   addHomeValidation
}