const {Router}=require("express");
const { verifyUser } = require("../../middleware/verify_user");
const { createUser, login } = require("../../controller/auth/loginsignUp_controller");

const router=Router();
router.post("/add-User",createUser)
router.post("/login",login)

module.exports=router;