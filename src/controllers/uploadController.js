const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //là nơi địng nghĩa đường dẫn lưu hình 
        cb(null, process.cwd() + "/public/img");
    },
    filename: (req, file, cb) => { 
        //Các cách để xử lý trùng tên ảnh 
        //Math.random 
        //time

        const newfileName = new Date().getTime() + "-" + file.originalname;
        cb(null, newfileName);
    }
})


const upload = multer({ storage });

module.exports = upload;
