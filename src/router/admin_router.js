const { Router } = require("express");
const { verifyUser } = require("../middleware/verify_user");
const {viewAllUsers,addHome}=require("../controller/admin_controller");
const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const multer = require("../middleware/multer");

const router = Router();
router.get("/view_All_User",verifyUser(ADMIN_ROLE), viewAllUsers);
router.post("/addHome",verifyUser(ADMIN_ROLE),  multer.array("photos",9),addHome);   

module.exports = router;
