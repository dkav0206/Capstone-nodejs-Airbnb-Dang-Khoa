// const User = require("../models/user");
const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, verifyToken, parseJwt} = require("../config/jwt");

const bcrypt = require('bcrypt'); 
const fs = require('fs');



const Op = Sequelize.Op;



//----------------------------------------- MAIN -------------------------------------
const login = async (req, res) => {
    try{
        let {email, mat_khau} = req.body;

        let modelUser = { 
            email, 
            mat_khau
        };

        let checkEmail = await model.nguoi_dung.findOne({
            where: { 
                email
            }
        })

        if (checkEmail){
            let checkPass = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);
            if (checkPass){
                let token = generateToken({data: {...checkEmail.dataValues, mat_khau: ""}});
                successCode(res, token, "Login thành công");
            }else{
                failCode(res, "", "Mật khẩu không đúng");
            }
        } else { 
            failCode(res, "", "Email không đúng");
        }

        
    }
    catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}


const signUp = async (req, res) => { 
    try{
        let {email, mat_khau, ho_ten, tuoi} = req.body;
        let anh_dai_dien = req.file;

        let modelUser = {
            email, 
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            ho_ten, 
            tuoi,
            anh_dai_dien: anh_dai_dien.filename.toString()
        };


        let checkEmail = await model.nguoi_dung.findOne({
            where: { 
                email
            }
        })

        
        if (checkEmail){
            failCode(res, modelUser, "Email đã tồn tại !");
            fs.unlinkSync(process.cwd() + "/public/img/" + anh_dai_dien.filename.toString());
        } else { 
            
            await model.nguoi_dung.create(modelUser);
            successCode(res, modelUser, "tạo mới thành công");
        }

        
    }
    catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}

// ----------------------------------------- Image Setting (Quản lý ảnh) -----------------------------
const getCurrentUser = async (req,res) => {
    try {
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;
            let data = await model.nguoi_dung.findAll({
                where:{nguoi_dung_id}
            });
            
            successCode(res, data, "Lấy dữ liệu thành công");
        }
        
    
    }
    catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}


//---------------------------------------Profile Setting ------------------------------
const updateUser = async (req,res) => {
    try { 
        let {token} = req.headers; 
        if (verifyToken(token)){
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;

            let {email, mat_khau, ho_ten, tuoi} = req.body;

            let anh_dai_dien = req.file;

            let modelUser = {
                email, 
                mat_khau: bcrypt.hashSync(mat_khau, 10), 
                ho_ten,
                tuoi,
                anh_dai_dien: anh_dai_dien.filename.toString()
            };

            let checkEmail = await model.nguoi_dung.findOne({
                where: { 
                    email
                }
            })

            let checkID = await model.nguoi_dung.findOne({
                where: { 
                    nguoi_dung_id
                }
            })

            if (checkID.email === email || !checkEmail) { 
                try{
                    fs.unlinkSync(process.cwd() + "/public/img/" + checkID.anh_dai_dien);
                } catch {}
                
                await model.nguoi_dung.update(modelUser, {
                    where:{
                        nguoi_dung_id, 
                    }
                })
                successCode(res, modelUser, "Update thành công");
            } else if (checkEmail){
                failCode(res, modelUser, "Email đã tồn tại !");
                fs.unlinkSync(process.cwd() + "/public/img/" + anh_dai_dien.filename.toString());
            } 

        }
       
    }
    catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
    
}

module.exports = { 
    getCurrentUser,
    updateUser,
    signUp,
    login
}   
