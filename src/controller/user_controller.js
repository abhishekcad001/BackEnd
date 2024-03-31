const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const { becameListerValidation } = require("../config/joi.validation");
const ListerModel = require("../model/lister_model");
// const UserModel = require("../model/user_model");
const ApiError = require("../utils/error");
const HomeModel = require("../model/home_model");

async function becameLister(req, res, next) {
    try {
        const id = req.id;
        // const findUser=await UserModel.findById({id:id})
        const listerValid = becameListerValidation.validate(req.body);
        if (listerValid.error) {
            return next(new ApiError(403, listerValid.error.details[0].message));
        }
        const listerRequest = new ListerModel({
            ...req.body,
            userId: id,
        });
        await listerRequest.save();
        res.status(201).json({ success: true, message: "lister request created" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function singleList(req, res, next) {
    try {
        const id = req.params.id;
        const findList = await HomeModel.findById({ _id: id });
        res.status(200).json({ success: true, data: findList });
    } catch (error) {
        next(new ApiError(error.message));
    }
}
module.exports = {
    becameLister,
    singleList,
};
