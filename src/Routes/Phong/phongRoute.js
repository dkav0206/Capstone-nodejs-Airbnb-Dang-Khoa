const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const { getPhong, createPhong, getPhongtheoVitri, getPhongPhantrang, getPhongtheoID, updatePhong, deletePhong, uploadImagePhong } = require("../../controllers/phongController");
const upload = require("../../controllers/uploadController");

const phongRoute = express.Router();

phongRoute.get("", checkToken, getPhong);
phongRoute.post("", createPhong);
phongRoute.get("/lay-phong-theo-vi-tri", checkToken, getPhongtheoVitri);
phongRoute.get("/phan-trang-tim-kiem", checkToken, getPhongPhantrang);
phongRoute.get("/:id", checkToken, getPhongtheoID);
phongRoute.put("/:id", updatePhong);
phongRoute.delete("/:id", deletePhong);
phongRoute.post("/upload-hinh-phong", upload.single("formFile"), uploadImagePhong);

module.exports = phongRoute;

