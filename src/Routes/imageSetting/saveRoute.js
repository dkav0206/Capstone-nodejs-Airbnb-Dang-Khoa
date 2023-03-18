const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const saveRoute = express.Router();


const {getSavebyUser} = require("../../controllers/saveController");

saveRoute.get("/getSavebyUser", getSavebyUser);


module.exports = saveRoute;     