const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const { getRent, postRent, getRentbyID, updateRent, deleteRent, getRentbyUserID } = require("../../controllers/rentController");
const rentRoute = express.Router();


rentRoute.get("", checkToken, getRent);
rentRoute.post("", postRent);
rentRoute.get("/:id", checkToken, getRentbyID);
rentRoute.put("/:id", updateRent);
rentRoute.delete("/:id", deleteRent);
rentRoute.get("/lay-theo-nguoi-dung/:ma_nguoi_dat", getRentbyUserID);


module.exports = rentRoute;


