const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode, successCodeAdd} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, verifyToken,parseJwt} = require("../config/jwt");


const bcrypt = require('bcrypt'); 

const Op = Sequelize.Op;

//------------------------------------- Detail Page ----------------------------------------------
const getComment = async (req, res) => { 
    try{
        let {hinh_id} = req.params;
        let data = await model.binh_luan.findAll({
            where: {
                hinh_id
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

const postComment = async(req, res) =>{
    try{
       
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            let {hinh_id} = req.params;
            let nguoi_dung_id = parseJwt(token).data.nguoi_dung_id;
            let {noi_dung} = req.body;

            let modelComment = { 
                nguoi_dung_id,
                hinh_id,
                ngay_binh_luan: Date.now(),
                noi_dung
            }

            const checkImage = await model.hinh_anh.findOne({
                where:{hinh_id}
            });

            if(checkImage){   
                await model.binh_luan.create(modelComment);
                successCode(res, modelComment, "Comment thành công");
            } else{
                failCode(res, "", "Không tìm thấy ảnh");
            }
            
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

module.exports = { 
    getComment,
    postComment
}