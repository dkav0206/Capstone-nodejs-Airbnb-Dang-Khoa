const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode, successCodeAdd} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, verifyToken,parseJwt} = require("../config/jwt");


const bcrypt = require('bcrypt'); 

const Op = Sequelize.Op;

const getRent = async(req, res) =>  {
    try{
        // let {hinh_id} = req.params;
        let data = await model.DatPhong.findAll();

        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else{ 
            failCode(res, "", "Không tìm thấy phòng nào được đặt");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

const postRent = async(req, res) =>  {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let ma_nguoi_dat = parseJwt(token).data.id;
            let {ma_phong, ngay_den, ngay_di, so_luong_khach} = req.body;

            let modelRent = { 
                ma_nguoi_dat,
                ma_phong,
                ngay_den: Date.parse(ngay_den),
                ngay_di: Date.parse(ngay_di),
                so_luong_khach
            }

            const checkPhong = await model.Phong.findOne({
                where:{
                    id: ma_phong}
            });

            if(checkPhong && !isNaN(modelRent.ngay_den) && !isNaN(modelRent.ngay_di)){   
                if((modelRent.ngay_di - modelRent.ngay_den )>= 0){
                    await model.DatPhong.create(modelRent); 
                    successCode(res, modelRent, "Đặt phòng thành công");
                } else {
                    failCode(res, "", "Ngày đi phải lớn hơn ngày đến");
                }
            } else if (!checkPhong) {
                failCode(res, "", "Không tìm thấy phòng");
            } else if (isNaN(modelRent.ngay_den) || isNaN(modelRent.ngay_di)){
                failCode(res, "", "Ngày đi và Ngày đến không hợp lệ");
            }
            
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const getRentbyID = async(req, res) => { 
    try{
        let {id} = req.params;
        let data = await model.DatPhong.findAll({
            where:{id}
        });

        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else{ 
            failCode(res, "", "Không tìm thấy phòng nào được đặt");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

const updateRent = async(req, res) => { 
    try{ 
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.params;
            let ma_nguoi_dat = parseJwt(token).data.id;
            let {ma_phong, ngay_den, ngay_di, so_luong_khach} = req.body;

            let modelRent = { 
                ma_nguoi_dat,
                ma_phong,
                ngay_den: Date.parse(ngay_den),
                ngay_di: Date.parse(ngay_di),
                so_luong_khach
            }

            let checkDatPhong = await model.DatPhong.findOne({
                where:{
                    id,
                    ma_nguoi_dat,
                    ma_phong
                }
            })

            let checkPhong = await model.Phong.findOne({
                where: { 
                    id: ma_phong
                }
            })
            
            if (checkDatPhong && checkPhong && !isNaN(modelRent.ngay_den) && !isNaN(modelRent.ngay_di)){
                if((modelRent.ngay_di - modelRent.ngay_den )>= 0){
                    await model.DatPhong.update(modelRent, {
                        where:{
                            id,
                            ma_nguoi_dat,
                            ma_phong
                        }
                    })
                    successCode(res, modelRent, "Sửa đặt phòng thành công");
                } else {
                    failCode(res, "", "Ngày đi phải lớn hơn ngày đến");
                }
            } else if (!checkPhong){
                failCode(res, "", "Không tìm thấy phòng");
            }else if (isNaN(modelRent.ngay_den) || isNaN(modelRent.ngay_di)){
                failCode(res, "", "Ngày đi và Ngày đến không hợp lệ");
            }else{
                failCode(res, "", "Không phải phòng đặt của bạn nên không thể sửa");
            }   
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const deleteRent = async(req, res) => {
    try{ 
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.params;
            let ma_nguoi_dat = parseJwt(token).data.id;

            let checkDatPhong = await model.DatPhong.findOne({
                where:{
                    id,
                    ma_nguoi_dat
                }
            })
            
            if (checkDatPhong){
                await model.DatPhong.destroy({
                    where:{
                        id,
                        ma_nguoi_dat
                    }
                })
                successCode(res, "", "Xóa đặt phòng thành công");
            } else {
                failCode(res, "", "Bạn không thể xóa phòng đặt của người khác");
            }   
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const getRentbyUserID = async(req, res) => { 
    try{
        let {ma_nguoi_dat} = req.params;
        let data = await model.DatPhong.findAll({
            where:{
                ma_nguoi_dat
            }
        });

        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else{ 
            failCode(res, "", "Không tìm thấy đặt phòng");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

module.exports = { 
    getRent,
    postRent,
    getRentbyID,
    updateRent,
    deleteRent,
    getRentbyUserID
}
