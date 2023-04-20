const express = require("express");

const authRoute = require("./authRoutes");
const commentRoute = require("./BinhLuan/commentRoute");
const rentRoute = require("./DatPhong/rentRoute");
const nguoiDungRoute = require("./NguoiDung/nguoiDungRoute");
const phongRoute = require("./Phong/phongRoute");
const vitriRoute = require("./ViTri/vitriRoute");


const rootRoute = express.Router();

//import đối tượng Route
rootRoute.use("/auth", authRoute);
rootRoute.use("/binh-luan", commentRoute);
rootRoute.use("/dat-phong", rentRoute);
rootRoute.use("/users", nguoiDungRoute);
rootRoute.use("/phong-thue", phongRoute);
rootRoute.use("/vi-tri", vitriRoute);

module.exports = rootRoute; 
//localhost:8080/api/user/getUser
//localhost:8080/api/food/getFood
