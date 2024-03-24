const { Router } = require("express");
const { verifyUser } = require("../middleware/verify_user");
const {viewAllUsers,addHome, updateHome, deleteHome, viewAllList, getAllListerRequest, updateListerStatus, viewAllLister}=require("../controller/admin_controller");
const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const multer = require("../middleware/multer");

const router = Router();
router.get("/view_All_User",verifyUser(ADMIN_ROLE), viewAllUsers);
router.post("/addHome",verifyUser(ADMIN_ROLE),  multer.array("photos",9),addHome);   
router.put("/updateHome/:id",verifyUser(ADMIN_ROLE), multer.array("photos",9),updateHome);   
router.delete("/deleteHome/:id",verifyUser(ADMIN_ROLE),deleteHome);   
router.get("/view_All_List",verifyUser(ADMIN_ROLE),viewAllList);   
router.get("/view_All_ListerRequest",verifyUser(ADMIN_ROLE),getAllListerRequest);   
router.put("/update/lister_status/:id",verifyUser(ADMIN_ROLE),updateListerStatus);   
router.get("/view_All_Lister",verifyUser(ADMIN_ROLE),viewAllLister);   

module.exports = router;
