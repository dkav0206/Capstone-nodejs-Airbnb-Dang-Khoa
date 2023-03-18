// const User = require("../models/user");
const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode, successCodeAdd} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, parseJwt, verifyToken} = require("../config/jwt");


const bcrypt = require('bcrypt'); 
const fs = require('fs');

const Op = Sequelize.Op;

//------------------------------------- HOMEPAGE ----------------------------------------------
const getImage = async(req,res) =>{
    try{
        let data = await model.hinh_anh.findAll();

        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else { 
            successCodeAdd(res, data, "Lấy dữ liệu thành công", "Chưa có ảnh trong hệ thống");
        }
        

    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const getImagebyName = async(req,res) =>{
    try{
        let {name} = req.params;
        let data = await model.hinh_anh.findAll({
            where: { 
                ten_hinh: {[Op.like]: `%${name}%`}
            }
        });

        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else { 
            successCodeAdd(res, data, "Lấy dữ liệu thành công", "Chưa có ảnh trong hệ thống");
        }

    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

//------------------------------------- Detail Page ----------------------------------------------
const getImageDetail = async (req,res) => {
    try{
        let {hinh_id} = req.params;
        let data = await model.hinh_anh.findOne({
            where: {
                hinh_id
            },
            include:['nguoi_dung']
        });

        if (data){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else{ 
            failCode(res, "", "Không tìm thấy ảnh");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

//------------------------------------- Image Setting Page ----------------------------------------------
const getImageByUserId = async (req, res) => {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;
            
            let data = await model.hinh_anh.findAll({
                where: {
                    nguoi_dung_id
                }
            });

            if(data[0]){
                successCode(res, data, "Lấy ảnh thành công");
            } else {
                failCode(res, "", "Bạn chưa tạo ảnh nào");
            }

        }
    }catch(err){
        console.log(err)
        errorCode(res, "Lỗi BE");
    }
}

const deleteImageOfUser = async (req, res) => {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;
            let {hinh_id} = req.params; 
            
            let data = await model.hinh_anh.findOne({
                where: {
                    hinh_id,
                    nguoi_dung_id
                }
            });

            let checkImage = await model.hinh_anh.findOne({
                where:{
                    hinh_id
                }
            });

            if(checkImage && data){
                await model.hinh_anh.destroy({
                    where:{
                        hinh_id,
                        nguoi_dung_id
                    }
                    
                });
                fs.unlinkSync(process.cwd() + "/public/img/" + data.duong_dan.toString());
                successCode(res, data, "Xóa ảnh thành công");
            } else if(!data && checkImage){
                failCode(res, "", "Ảnh không phải của bạn nên không được xóa");
            } else if(!data && !checkImage){
                failCode(res, "", "Ảnh không hợp lệ");
            }

        }
    }catch(err){
        console.log(err)
        errorCode(res, "Lỗi BE");
    }
}


//-----------------------------------UploadImagePage ----------------------------
const uploadImage = async(req,res) =>  {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;
            let {ten_hinh, mo_ta} = req.body;
            let duong_dan = req.file;

            let modelUser = {
                ten_hinh, 
                duong_dan: duong_dan.filename.toString(),
                mo_ta, 
                nguoi_dung_id
            };

            
            await model.hinh_anh.create(modelUser);
            successCode(res, modelUser, "tạo mới thành công");
            
        } 

    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

module.exports = { 
    getImage,
    getImagebyName,
    getImageDetail,
    getImageByUserId,
    deleteImageOfUser,
    uploadImage
}   


