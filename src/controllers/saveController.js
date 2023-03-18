const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode, successCodeAdd} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, parseJwt, verifyToken} = require("../config/jwt");


const bcrypt = require('bcrypt'); 

const Op = Sequelize.Op;

//------------------------------------Detail Page --------------------------------
const imageSave = async(req, res) => { 
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let {hinh_id} = req.params;
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;
            
            let checkImage = await model.hinh_anh.findOne({
                where:{hinh_id}
            })

            let data = await model.luu_anh.findOne({
                where: {
                    hinh_id,
                    nguoi_dung_id
                }
            });

            if(data && checkImage){
                successCode(res, data, "Người dùng này đã lưu ánh");
            } else if (!checkImage){ 
                failCode(res, "", "Ảnh không hợp lệ");
            } else if (checkImage && !data){
                failCode(res, "", "Người dùng chưa lưu ảnh");
            }

        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
    
}

//-----------------------------------Image Setting Page ----------------------------------
const getSavebyUser = async(req, res) => { 
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;
            
            let data = await model.luu_anh.findAll({
                where: {
                    nguoi_dung_id
                }
            });

            if(data[0]){
                successCode(res, data, "Lấy ảnh đã lưu thành công");
            } else {
                failCode(res, "", "Bạn chưa lưu ảnh nào");
            }

        }
    }catch(err){
        console.log(err)
        errorCode(res, "Lỗi BE");
    }
}

module.exports = { 
    imageSave,
    getSavebyUser
}
