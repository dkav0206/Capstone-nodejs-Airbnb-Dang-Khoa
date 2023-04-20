const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const { getVitri, createVitri, getVitriPhanTrang, getVitribyID, updateVitri, deleteVitri, uploadImageVitri } = require("../../controllers/vitriController");
const upload = require("../../controllers/uploadController");

const vitriRoute = express.Router();

vitriRoute.get("", checkToken, getVitri);
vitriRoute.post("", createVitri);
vitriRoute.get("/phan-trang-tim-kiem", checkToken, getVitriPhanTrang);
vitriRoute.get("/:id", checkToken, getVitribyID);
vitriRoute.put("/:id", updateVitri);
vitriRoute.delete("/:id", deleteVitri);
vitriRoute.post("/upload-hinh-vi-tri", upload.single("formFile"), uploadImageVitri);


module.exports = vitriRoute;
