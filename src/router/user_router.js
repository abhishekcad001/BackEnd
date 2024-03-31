const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const { Router } = require("express");
const { verifyUser } = require("../middleware/verify_user");
const { becameLister, singleList } = require("../controller/user_controller");
const { addHome, viewAllList } = require("../controller/admin_controller");
const multer = require("../middleware/multer");

const router = Router();
router.post("/becameLister", verifyUser(USER_ROLE), becameLister);
router.post("/addHome", verifyUser(USER_ROLE), multer.array("photos", 9), addHome);
router.get("/view_All_List",verifyUser(USER_ROLE),viewAllList); 
router.get("/view_Single_All_List/:id",verifyUser(USER_ROLE),singleList); 


module.exports = router;
