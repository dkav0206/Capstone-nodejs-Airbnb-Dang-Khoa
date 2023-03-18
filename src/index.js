//yarn init -y
//yarn add express

// import thư viện express
const express = require("express");
//tạo biến gắn cho hàm express
const app = express();

//middleware chuyển đổi để đọc được đinh dạng json
app.use(express.json());

//middleware để định vị thư mục để load tài nguyên
app.use(express.static("."));

//cho phép FE truy cập API từ BE
const cors = require("cors");
app.use(cors());

//tạo ra mọt host từ thư viện express
app.listen(8080); //port 8080


const rootRoute = require("./Routes/rootRoutes");
const detailRoute = require("./Routes/Detailpage/detailRoute");
const homePageRoute = require("./Routes/HomePage/homePageRoute");
const imageSettingRoute = require("./Routes/imageSetting/imageSettingRoute");
const profileSettingRoute = require("./Routes/ProfileSetting/profileSettingRoute");
const uploadImageRoute = require("./Routes/UploadImagePage/uploadImageRoute");

app.use("/api", rootRoute);

app.use("/detail", detailRoute);

app.use("/homePage", homePageRoute);

app.use("/imageSetting", imageSettingRoute);

app.use("/profileSetting", profileSettingRoute);

app.use("/uploadImage", uploadImageRoute);



//yarn add sequelize

//file system 
// const fs = require('fs');

// console.log(__dirname); //=> trả về đường dẫn file của bạn đang đứng 
// console.log(process.cwd());//=> trả về đường dẫn gốc của project

// //tạo một file
// fs.writeFile(process.cwd()+"/public/text.txt", "node 28", (err) => {});

// //đọc file
// fs.readFile(process.cwd()+"/public/text.txt", "utf-8" ,(err, data) => {
//     console.log(data);
// })
// //sửa file 

// fs.unlink(process.cwd()+"/public/text.txt", (err) => {});

