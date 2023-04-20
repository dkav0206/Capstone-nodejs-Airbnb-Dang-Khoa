const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode, successCodeAdd} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, verifyToken,parseJwt} = require("../config/jwt");


const bcrypt = require('bcrypt'); 

const Op = Sequelize.Op;

//------------------------------------- Detail Page ----------------------------------------------
const getCommentAll = async (req, res) => { 
    try{
        // let {hinh_id} = req.params;
        let data = await model.BinhLuan.findAll();

        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else{ 
            failCode(res, "", "Không tìm thấy bình luận");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
    
}

const postComment = async(req, res) =>{
    try{
       
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let ma_nguoi_binh_luan = parseJwt(token).data.id;
            let {ma_phong, noi_dung, sao_binh_luan} = req.body;

            let modelComment = { 
                ma_nguoi_binh_luan,
                ma_phong,
                ngay_binh_luan: new Date().getTime(),
                noi_dung,
                sao_binh_luan
            }

            const checkImage = await model.Phong.findOne({
                where:{
                    id: ma_phong}
            });

            if(checkImage){   
                await model.BinhLuan.create(modelComment);
                successCode(res, modelComment, "Comment thành công");
            } else{
                failCode(res, "", "Không tìm thấy phòng");
            }
            
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const updateComment = async(req, res) => {
    try{ 
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.params;
            let ma_nguoi_binh_luan = parseJwt(token).data.id;
            let {ma_phong, noi_dung, sao_binh_luan} = req.body;

            let modelComment = { 
                ma_nguoi_binh_luan,
                ma_phong,
                ngay_binh_luan: new Date().getTime(),
                noi_dung,
                sao_binh_luan
            }

            let checkBinhLuan = await model.BinhLuan.findOne({
                where:{
                    id,
                    ma_nguoi_binh_luan,
                    ma_phong
                }
            })

            let checkPhong = await model.Phong.findOne({
                where: { 
                    id: ma_phong
                }
            })
            
            if (checkBinhLuan && checkPhong){
                await model.BinhLuan.update(modelComment, {
                    where:{
                        id,
                        ma_nguoi_binh_luan,
                        ma_phong
                    }
                })
                successCode(res, modelComment, "Sửa comment thành công");
            } else if (!checkPhong){
                failCode(res, "", "Không tìm thấy phòng");
            }else{
                failCode(res, "", "Không phải bình luận của bạn nên không thể sửa");
            }   
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const deleteComment = async(req, res) => {
    try{ 
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.params;
            let ma_nguoi_binh_luan = parseJwt(token).data.id;

            let checkBinhLuan = await model.BinhLuan.findOne({
                where:{
                    id,
                    ma_nguoi_binh_luan
                }
            })
            
            if (checkBinhLuan){
                await model.BinhLuan.destroy({
                    where:{
                        id,
                        ma_nguoi_binh_luan
                    }
                })
                successCode(res, "", "Xóa comment thành công");
            } else {
                failCode(res, "", "Bạn không thể xóa bình luận của người khác");
            }   
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const getCommentbyRoomID = async(req, res) => {
    try{
        let {ma_phong} = req.params;
        let data = await model.BinhLuan.findAll({
            where:{
                ma_phong
            }
        });

        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else{ 
            failCode(res, "", "Không tìm thấy bình luận");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

module.exports = { 
    getCommentAll,
    postComment,
    updateComment,
    deleteComment,
    getCommentbyRoomID
}