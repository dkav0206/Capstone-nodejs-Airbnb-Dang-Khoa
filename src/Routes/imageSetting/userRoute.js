const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const userRoute = express.Router();

//import controller 
const {getCurrentUser} = require("../../controllers/userController");

userRoute.get("/getCurrentUser", getCurrentUser);

// //POST 
// userRoute.post("/createUser", checkToken,createUser);

// //PUT
// userRoute.put("/updateUser/:user_id", checkToken, updateUser);

//DELETE


module.exports = userRoute; 