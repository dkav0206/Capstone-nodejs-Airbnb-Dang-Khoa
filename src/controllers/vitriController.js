const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, verifyToken, parseJwt} = require("../config/jwt");

const bcrypt = require('bcrypt'); 
const fs = require('fs');

const Op = Sequelize.Op;


const getVitri = async(req, res) => { 
    try {
        let data = await model.ViTri.findAll();
        
        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");   
        }else { 
            failCode(res, data, "Không tìm thấy dữ liệu");
        }
    }
    catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}

const createVitri = async(req, res) =>{ 
    try {
        let { token } = req.headers;
        if (verifyToken(token)) {
            // token hợp lệ
            let { role } = parseJwt(token).data;
            let { 
                ten_vi_tri,
                tinh_thanh,
                quoc_gia,
                hinh_anh
            } = req.body;

            let modelVitri = {
                ten_vi_tri,
                tinh_thanh,
                quoc_gia,
                hinh_anh: ""
            }

            if (role === "ADMIN") {
                await model.ViTri.create(modelVitri);
                successCode(res, modelVitri, "Tạo vị trí thành công");
            } else {
                failCode(res, "", "Bạn không phải admin nên hong tạo vị trí được");
            }

        }
    } catch (err) {
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const getVitriPhanTrang = async(req, res) => { 
    try{ 
        let{pageIndex, pageSize, keyword} = req.query;

        if (!keyword){
            keyword = "";
        }

        let dataAll = await model.Phong.findAll();

        let data = await model.ViTri.findAll({
            where:{
                ten_vi_tri: {[Op.like]: `%${keyword}%`}
            },
            offset: Number((pageIndex-1) * pageSize),
            limit: Number(pageSize),
            subQuery:false
        });

        let modeViTri =  {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
            totalRow: dataAll.length,
            keywords: keyword?keyword:null,
            data
        }

        successCode(res, modeViTri, "Lấy dữ liệu thành công");

    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}

const getVitribyID = async(req, res) => { 
    try {
        let {id} = req.params
        let data = await model.ViTri.findAll({where:{id}});
        
        if (data[0]){
            successCode(res, data, "Lấy dữ liệu thành công");   
        }else { 
            failCode(res, data, "Không tìm thấy dữ liệu");
        }
    }
    catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}

const updateVitri = async(req, res) => { 
    try {
        let { token } = req.headers;
        if (verifyToken(token)) {
            // token hợp lệ
            let {id} = req.params;
            let { role } = parseJwt(token).data;
            let { 
                ten_vi_tri,
                tinh_thanh,
                quoc_gia,
                hinh_anh
            } = req.body;

            let modelVitri = {
                ten_vi_tri,
                tinh_thanh,
                quoc_gia,
            }
    
            let checkID = await model.ViTri.findOne({where:{id}});

            if (role === "ADMIN") {
                if (checkID){
                    await model.ViTri.update(modelVitri, {where:{id}});
                    successCode(res, modelVitri, "Update vị trí thành công");
                } else {
                    failCode(res, "", "ID không tồn tại");
                }
            } else {
                failCode(res, "", "Bạn không phải admin nên hong tạo vị trí được");
            }
        }
    } catch (err) {
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}


const deleteVitri = async(req,res) => { 
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.params;
            let role = parseJwt(token).data.role;
            let checkViTri = await model.ViTri.findOne({where:{id}});
            
            if (role === "ADMIN"){
                if (checkViTri){
                    await model.ViTri.destroy({
                        where:{
                            id
                        }
                    })

                    try{
                        fs.unlinkSync(process.cwd() + "/public/img/" + checkViTri.hinh_anh.toString());
                    }catch{}

                    successCode(res, "", "Xóa Vị trí thành công");
                } else{
                    failCode(res, "", "Vị trí không tồn tại");
                }
            }else{ 
                failCode(res, "", "Bạn không phải admin nên không thể xóa vị trí");
            }
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}


const uploadImageVitri = async(req, res) => {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.query;
            let {role} = parseJwt(token).data;
            let duong_dan = req.file;

            let modelImamge = {
                hinh_anh: duong_dan.filename.toString(),
            };

            let checkID = await model.ViTri.findOne({where: {id}});

            if (role === "ADMIN"){
                if(checkID){
                    try{
                        fs.unlinkSync(process.cwd() + "/public/img/" + checkID.hinh_anh.toString());
                    } catch {}

                    await model.ViTri.update(modelImamge, {where:{id}});
                    successCode(res, modelImamge, "Upload ảnh thành công");
                } else { 
                    fs.unlinkSync(process.cwd() + "/public/img/" + duong_dan.filename.toString());
                    failCode(res, "", "ID không tồn tại");
                }
            } else {
                fs.unlinkSync(process.cwd() + "/public/img/" + duong_dan.filename.toString());
                failCode(res, "", "Bạn không phải admin nên không thể upload ảnh vị trí");
            }
            
        } 

    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

module.exports = { 
    getVitri,
    createVitri,
    getVitriPhanTrang,
    getVitribyID,
    updateVitri,
    deleteVitri,
    uploadImageVitri
}

