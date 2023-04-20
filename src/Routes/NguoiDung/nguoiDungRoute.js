const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const { getUser, createUser, deleteUser, getUserPhanTrang, getUserbyID, updateUser, getUserbyName, uploadAvatar } = require("../../controllers/userController");
const upload = require("../../controllers/uploadController");

const nguoiDungRoute = express.Router();

nguoiDungRoute.get("", checkToken ,getUser);
nguoiDungRoute.post("", createUser); 
nguoiDungRoute.delete("", deleteUser);
nguoiDungRoute.get("/phan-trang-tim-kiem", checkToken, getUserPhanTrang);
nguoiDungRoute.get("/:id", checkToken, getUserbyID);
nguoiDungRoute.put("/:id", updateUser);
nguoiDungRoute.get("/search/:name", checkToken, getUserbyName);
nguoiDungRoute.post("/upload-avatar", upload.single("formFile"), uploadAvatar);


module.exports = nguoiDungRoute;


