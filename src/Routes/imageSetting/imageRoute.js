const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const imageRoute = express.Router();

const {getImageByUserId, deleteImageOfUser} = require("../../controllers/imageController");

imageRoute.get("/getImagebyUser", getImageByUserId);
imageRoute.delete("/deleteImageOfUser/:hinh_id" , deleteImageOfUser)


module.exports = imageRoute; 