const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const { Router } = require("express");
const { verifyUser } = require("../middleware/verify_user");
const { becameLister } = require("../controller/user_controller");
const { addHome } = require("../controller/admin_controller");

const router = Router();
router.post("/becameLister", verifyUser(USER_ROLE), becameLister);
router.post("/addHome",verifyUser(USER_ROLE),addHome);
module.exports=router;