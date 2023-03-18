const express = require("express");
const { verifyToken } = require("../config/jwt");
const { checkToken } = require("../controllers/authController");
const userRoute = express.Router();

//import controller 
const {signUp, login} = require("../controllers/userController");

const upload = require('../controllers/uploadController');

//login
userRoute.post("/login", login);

//signup
userRoute.post("/signUp", upload.single("anh_dai_dien"), signUp);


module.exports = userRoute; 