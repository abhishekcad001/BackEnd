const { Router } = require("express");
const { verifyUser } = require("../../middleware/verify_user");
const { createUser, login, forgetPasswordVerifyEmail, verifyOtpForgetPwd } = require("../../controller/auth/loginsignUp_controller");

const router = Router();
router.post("/add-User", createUser);
router.post("/login", login);
router.post("/verify-email", forgetPasswordVerifyEmail);
router.post("/verify-otp-ChnagePwd", verifyOtpForgetPwd);

module.exports = router;
