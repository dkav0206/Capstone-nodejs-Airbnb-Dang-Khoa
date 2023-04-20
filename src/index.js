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

app.use("/api", rootRoute);


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// const rootRouter = require('./routes/index');
// app.use("/api", rootRouter);
// localhost:8080/api-docs

const options = {
    definition: {
        info: {
            title: "Swagger node 28",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"]
}

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));