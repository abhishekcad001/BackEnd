const { addHomeValidation } = require("../config/joi.validation");
const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const HomeModel = require("../model/home_model");
const UserModel = require("../model/user_model");
const { multipleImageUpload } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/error");
const ListerModel = require("../model/lister_model");
const transporter = require("../utils/transporter");

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
        const id = req.id;
        const role = req.role;
        if (req.role === USER_ROLE) {
            console.log(id);
            const findStatus = await ListerModel.find({ userId: id, request_status: "approved" });
            console.log(findStatus);
            if (findStatus.length === 0) {
                return next(new ApiError(403, "You are not approved as a lister"));
            } else {
                const updateLister = await UserModel.findByIdAndUpdate({ _id: id }, { $set: { isLister: true } }, { new: true });
            }
        }
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
        const home = new HomeModel({
            ...req.body,
            role: role,
        });
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
        const home = await HomeModel.findByIdAndUpdate({ _id: id }, { $set: { isActive: false } }, { new: true });
        res.status(201).json({ success: true, data: home, message: "details delete successfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function viewAllList(req, res, next) {
    try {
        const allHomes = await HomeModel.find();
        res.status(200).json({ success: true, data: allHomes, message: "list of data" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function getAllListerRequest(req, res, next) {
    try {
        const listerRequest = await ListerModel.find();
        res.status(200).json({ success: true, data: listerRequest, message: "list of to became lister" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function updateListerStatus(req, res, next) {
    try {
        const id = req.params.id;
        const findLister = await ListerModel.findOneAndUpdate({ _id: id }, { $set: { request_status: req.body.request_status } }, { new: true });

        const email = findLister.email;
        const filePath = path.join(__dirname, "../../public/status.html");
        let htmlData = fs.readFileSync(filePath, "utf-8");
        const status = findLister.request_status;
        htmlData = htmlData.replace("${status}", status);
        transporter.sendMail(
            {
                to: email,
                subject: "update status",
                html: htmlData,
            },
            async (err, _result) => {
                if (err) {
                    return next(new ApiError(400, err.message));
                }

                res.status(200).json({
                    statusCode: 200,
                    success: true,
                    message: "request_status send to  your email",
                });
            },
        );
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function viewAllLister(req, res, next) {
    try {
        const lister = await HomeModel.find({ role: "User" });
        res.status(200).json({ success: true, data: lister });
    } catch (error) {
        next(new ApiError(error.message));
    }
}
module.exports = { viewAllUsers, addHome, updateHome, deleteHome, viewAllList, getAllListerRequest, updateListerStatus, viewAllLister };
