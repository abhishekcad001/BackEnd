const { Router } = require("express");
const loginsignUpRouter =require("./auth/loginsignUp_router")
const router=Router();

router.use("/auth",loginsignUpRouter)
module.exports=router