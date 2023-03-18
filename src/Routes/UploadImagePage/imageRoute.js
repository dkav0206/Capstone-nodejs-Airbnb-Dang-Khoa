const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const imageRoute = express.Router();

const {uploadImage} = require("../../controllers/imageController");


const upload = require('../../controllers/uploadController');

imageRoute.post("/uploadImage", upload.single("duong_dan"), uploadImage);

module.exports = imageRoute; 