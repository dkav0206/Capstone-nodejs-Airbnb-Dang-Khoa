const express = require("express");

const userRoute = require("./userRoutes");

const rootRoute = express.Router();

//import đối tượng Route
rootRoute.use("/user", userRoute);

module.exports = rootRoute; 
//localhost:8080/api/user/getUser
//localhost:8080/api/food/getFood