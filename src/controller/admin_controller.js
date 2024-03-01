const { addHomeValidation } = require("../config/joi.validation");
const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const HomeModel = require("../model/home_model");
const UserModel = require("../model/user_model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");

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
    const homeValidation = addHomeValidation.validate(req.body);
    if (homeValidation.error) {
      return next(new ApiError(403, homeValidation.error.details[0].message));
    }
    const file = req.file;
    if (!file) {
      return next(new ApiError(403, "Home photos ares required"));
    }
    const path = file.path;
    const result = await cloudinary.uploader.upload(path);
    req.body.photos = result.secure_url;
    req.body.publicId = result.public_id;
    fs.unlinkSync(path);
    const home = new HomeModel(req.body);
    await home.save();
    res.status(201).json({ success: true, message: "New home listed" });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
}
module.exports = { viewAllUsers, addHome };
