const { Router } = require("express");
const loginsignUpRouter =require("./auth/loginsignUp_router")
const adminRouter =require("./admin_router")
const router=Router();

router.use("/auth",loginsignUpRouter)
router.use("/admin",adminRouter)
module.exports=router