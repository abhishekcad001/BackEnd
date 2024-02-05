const { createToken } = require("../../authentication/jwt_token");
const { addUserValidation } = require("../../config/joi.validation");
const UserModel = require("../../model/user_model");
const ApiError = require("../../utils/error");
const { compareHash, hashPassword } = require("../../utils/hash");
const { USER_ROLE } = require("../../config/string");
const generateOtp = require("../../utils/genarate_otp");
const transporter = require("../../utils/transporter");
const fs = require("fs");
const path = require("path");
const OtpModel = require("../../model/otp_model");

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
                const token = createToken({ id: findUser._id, role: USER_ROLE });
                res.status(200).json({ success: true, message: "login successfully", token: token });
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

async function forgetPasswordVerifyEmail(req, res, next) {
    try {
        debugger;
        const { email } = req.body;
        const filePath = path.join(__dirname, "../../../public/otp.html");
        let htmlData = fs.readFileSync(filePath, "utf-8");
        const otp = generateOtp();
        htmlData = htmlData.replace("${otp}", otp);
        transporter.sendMail(
            {
                to: email,
                subject: "Verify email",
                html: htmlData,
            },
            async (err, _result) => {
                if (err) {
                    return next(new ApiError(400, err.message));
                }
                await OtpModel.deleteMany({ email: email });
                const otpModel = new OtpModel({ email, otp });
                await otpModel.save();
                setTimeout(async () => {
                    await OtpModel.findByIdAndDelete(otpModel._id);
                }, 1000 * 60);
                res.status(200).json({ statusCode: 200, success: true, message: "Otp send your email" });
            },
        );
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function verifyOtpForgetPwd(req, res, next) {
    try {
        const { email, otp, newPassword } = req.body;
        const findOtp = await OtpModel.findOne({ email });
        if (!findOtp) {
            return next(new ApiError(400, "Otp Expired"));
        } else {
            const hashPwd = hashPassword(newPassword);
            const newPwdSet = await UserModel.updateOne({ email: email }, { $set: { password: hashPwd } });
        }
        if (findOtp.otp !== otp) {
            return next(new ApiError(400, "Otp is wrong"));
        }
        await OtpModel.deleteMany({ email: email });
        res.status(200).json({ statusCode: 200, success: true, message: "Password change successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

module.exports = { createUser, login, forgetPasswordVerifyEmail, verifyOtpForgetPwd };
