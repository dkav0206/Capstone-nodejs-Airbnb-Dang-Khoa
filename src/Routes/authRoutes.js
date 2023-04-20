const express = require("express");
const { verifyToken } = require("../config/jwt");
const { checkToken } = require("../controllers/authController");
const authRoute = express.Router();

//import controller 
const {signUp, login} = require("../controllers/userController");

const upload = require('../controllers/uploadController');

//login
authRoute.post("/signin", login);

//signup
authRoute.post("/signup", signUp);




module.exports = authRoute; 