const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const commentRoute = express.Router();


const {getCommentAll, postComment, updateComment, deleteComment, getCommentbyRoomID} = require("../../controllers/commentController");

commentRoute.get("", checkToken, getCommentAll);

commentRoute.post("", postComment);

commentRoute.put("/:id", updateComment);

commentRoute.delete("/:id", deleteComment);

commentRoute.get("/lay-binh-luan-theo-phong/:ma_phong", checkToken, getCommentbyRoomID);

module.exports = commentRoute; 