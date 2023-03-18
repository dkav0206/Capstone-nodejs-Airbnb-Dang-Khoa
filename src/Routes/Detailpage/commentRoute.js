const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const commentRoute = express.Router();


const {getComment, postComment} = require("../../controllers/commentController");

commentRoute.get("/getComment/:hinh_id", checkToken, getComment);
commentRoute.post("/postComment/:hinh_id", postComment);

module.exports = commentRoute; 