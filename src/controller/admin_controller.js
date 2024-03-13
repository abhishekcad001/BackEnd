const { addHomeValidation } = require("../config/joi.validation");
const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const HomeModel = require("../model/home_model");
const UserModel = require("../model/user_model");
const { multipleImageUpload } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/error");

async function viewAllUsers(req, res, next) {
    try {
        const allUsers = await UserModel.find();
        res.status(201).json({ success: true, data: allUsers });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function addHome(req, res, next) {
    debugger;
    try {
        const homeValidation = addHomeValidation.validate(req.body);
        if (homeValidation.error) {
            return next(new ApiError(403, homeValidation.error.details[0].message));
        }
        const file = req.files;
        if (!file) {
            return next(new ApiError(403, "Home photos ares required"));
        }
        const result = await multipleImageUpload(file.map((e) => e.path));
        req.body.photos = result.map((e) => {
            return { url: e.secure_url, publicId: e.public_id };
        });
        const home = new HomeModel(req.body);
        await home.save();
        res.status(201).json({ success: true, message: "New home listed" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function updateHome(req, res, next) {
    try {
        const id = req.params.id;
        if (req.file) {
            const result = await multipleImageUpload(file.map((e) => e.path));
            req.body.photos = result.map((e) => {
                return { url: e.secure_url, publicId: e.public_id };
            });
        }
        const home = await HomeModel.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        res.status(201).json({ success: true, data: home, message: "details update successfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
async function deleteHome(req, res, next) {
    try {
      const id = req.params.id;
      const home = await HomeModel.findByIdAndDelete({ _id: id });
      res.status(201).json({ success: true, data: home, message: "details delete successfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function viewAllList(req, res, next) {
    try {
        const allHomes = await HomeModel.find();
        res.status(201).json({ success: true, data: allHomes, message: "list of data" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
module.exports = { viewAllUsers, addHome, updateHome, deleteHome, viewAllList };
