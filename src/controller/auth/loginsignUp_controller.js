const { createToken } = require("../../authentication/jwt_token");
const { addUserValidation } = require("../../config/joi.validation");
const UserModel = require("../../model/user_model");
const ApiError = require("../../utils/error");
const { compareHash } = require("../../utils/hash");
const {USER_ROLE}=require("../../config/string")
async function createUser(req, res, next) {
    try {
        const id = req.id;
        const findUser = await UserModel.findOne({ email: req.body.email });
        if (findUser) {
            return next(new ApiError(400, "Already contain this email"));
        }
        // req.body.company = id;

        const userValid = addUserValidation.validate(req.body);
        if (userValid.error) {
            return next(new ApiError(403, userValid.error.details[0].message));
        }

        const user = new UserModel(req.body);
        await user.save();
        res.status(201).json({ success: true, message: "User added successfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const findUser = await UserModel.findOne({ email });
        if (findUser) {
            const comparePass = compareHash(password, findUser.password);
            if (comparePass == true) {
                const token = createToken({ id: findUser._id, role: USER_ROLE});
                res.status(200).json({ success: true, message: "login successfully" ,token: token});
            } else {
                return next(new ApiError(401, "Password is wrong"));
            }
        } else {
            return next(new ApiError(401, "Email not exist"));
        }
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
module.exports = { createUser, login };
