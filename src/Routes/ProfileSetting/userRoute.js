const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const userRoute = express.Router();
const upload = require('../../controllers/uploadController');

//import controller 
const {updateUser} = require("../../controllers/userController");

userRoute.put("/updateUser", upload.single("anh_dai_dien"), updateUser);

module.exports = userRoute; 