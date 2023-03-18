const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const imageRoute = express.Router();

const {getImageDetail} = require("../../controllers/imageController");

imageRoute.get("/getImageDetail/:hinh_id", checkToken, getImageDetail);

module.exports = imageRoute; 