const { createToken } = require("../../authentication/jwt_token");
const { addUserValidation } = require("../../config/joi.validation");
const UserModel = require("../../model/user_model");
const ApiError = require("../../utils/error");
const { compareHash, hashPassword } = require("../../utils/hash");
const { USER_ROLE, ADMIN_ROLE } = require("../../config/string");
const generateOtp = require("../../utils/genarate_otp");
const transporter = require("../../utils/transporter");
const fs = require("fs");
const path = require("path");
const OtpModel = require("../../model/otp_model");
const AdminModel = require("../../model/admin_model");

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
<<<<<<< HEAD
        const token = createToken({ id: findUser._id, role: USER_ROLE });
        res.status(200).json({ success: true, message: "login successfully", token: token });
=======
        const token = createToken({ id: findUser._id, role: USER_ROLE,...findUser });
        res
          .status(200)
          .json({ success: true, message: "login successfully", token: token,role: USER_ROLE });
>>>>>>> 5db70cc5aef93e88379b7d14c51c9c794d0bce3e
      } else {
        return next(new ApiError(401, "Password is wrong"));
      }
    } else {
<<<<<<< HEAD
=======
        debugger
      const findAdmin = await AdminModel.findOne({ email });
      if (findAdmin) {
    
          const token = createToken({ id: findAdmin._id, role: ADMIN_ROLE });
          res
            .status(200)
            .json({
              success: true,
              message: "you login successfully",
              token: token,
              role: ADMIN_ROLE
            });
      }
>>>>>>> 5db70cc5aef93e88379b7d14c51c9c794d0bce3e
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
<<<<<<< HEAD
    const findEmail = await UserModel.findOne({ email });
if (findEmail) {
=======
>>>>>>> 5db70cc5aef93e88379b7d14c51c9c794d0bce3e
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
<<<<<<< HEAD
        res.status(200).json({ statusCode: 200, success: true, message: "Otp send your email" });
      }
    );
} else {
    res.status(400).json({ statusCode: 400, success: false, message: "This email not exist in the system." });
    
}

  
=======
        res
          .status(200)
          .json({
            statusCode: 200,
            success: true,
            message: "Otp send your email",
          });
      }
    );
>>>>>>> 5db70cc5aef93e88379b7d14c51c9c794d0bce3e
  } catch (error) {
    next(new ApiError(400, error.message));
  }
}

async function verifyOtpForgetPwd(req, res, next) {
  try {
    const { otp } = req.body;
    const findOtp = await OtpModel.findOne({ otp });
    if (!findOtp) {
      return next(new ApiError(400, "Otp Expired"));
    } else {
<<<<<<< HEAD
      res.status(200).json({ statusCode: 200, success: true, message: "Otp verify successfully" });
=======
      res
        .status(200)
        .json({
          statusCode: 200,
          success: true,
          message: "Otp verify successfully",
        });
>>>>>>> 5db70cc5aef93e88379b7d14c51c9c794d0bce3e
    }
  } catch (error) {
    next(new ApiError(400, error.message));
  }
}

async function newPasswordForgetPwd(req, res, next) {
  try {
    const { email, newPassword } = req.body;
    const findEmail = await UserModel.findOne({ email });
    if (!findEmail) {
      return next(new ApiError(400, "Email not exist"));
    } else {
      const hashPwd = hashPassword(newPassword);
<<<<<<< HEAD
      const newPwdSet = await UserModel.updateOne({ email: email }, { $set: { password: hashPwd } });
      res.status(200).json({ statusCode: 200, success: true, message: "Password update successfully" });
=======
      const newPwdSet = await UserModel.updateOne(
        { email: email },
        { $set: { password: hashPwd } }
      );
      res
        .status(200)
        .json({
          statusCode: 200,
          success: true,
          message: "Password update successfully",
        });
>>>>>>> 5db70cc5aef93e88379b7d14c51c9c794d0bce3e
    }
  } catch (error) {
    next(new ApiError(400, error.message));
  }
}
module.exports = {
  createUser,
  login,
  forgetPasswordVerifyEmail,
  verifyOtpForgetPwd,
  newPasswordForgetPwd,
};
