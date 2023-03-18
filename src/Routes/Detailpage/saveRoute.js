const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const saveRoute = express.Router();


const {imageSave} = require("../../controllers/saveController");

saveRoute.get("/ImageSaved/:hinh_id", imageSave);


module.exports = saveRoute;     