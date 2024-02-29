const { Router } = require("express");
const { verifyUser } = require("../middleware/verify_user");
const {viewAllUsers,addHome}=require("../controller/admin_controller");
const { USER_ROLE, ADMIN_ROLE } = require("../config/string");

const router = Router();
router.get("/view_All_User",verifyUser(ADMIN_ROLE), viewAllUsers);
router.get("/addHome",verifyUser(ADMIN_ROLE), addHome);

module.exports = router;
