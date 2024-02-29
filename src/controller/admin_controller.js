const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const UserModel = require("../model/user_model");

async function viewAllUsers(req, res, next) {
  try {
    const allUsers = await UserModel.find();
    res.status(201).json({ success: true, data: allUsers });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
}

async function addHome(req, res, next) {
try {
  
} catch (error) {
  next(new ApiError(400, error.message));
  
}
}
module.exports={viewAllUsers,addHome}
