const { Sequelize, where } = require("sequelize");
const { successCode, failCode, errorCode } = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const { generateToken, verifyToken, parseJwt } = require("../config/jwt");

const bcrypt = require('bcrypt');
const fs = require('fs');




const Op = Sequelize.Op;


const getPhong = async (req, res) => {
    try {
        let data = await model.Phong.findAll();

        if (data[0]) {
            successCode(res, data, "Lấy dữ liệu thành công");
        } else {
            failCode(res, data, "Không tìm thấy dữ liệu");
        }
    }
    catch (err) {
        console.log(err);
        errorCode(res, "Lỗi BE")
    }

}

const createPhong = async (req, res) => {
    try {
        let { token } = req.headers;
        if (verifyToken(token)) {
            // token hợp lệ
            let { role } = parseJwt(token).data;
            let { 
                ten_phong, 
                khach, 
                phong_ngu, 
                giuong, 
                phong_tam, 
                mo_ta, 
                gia_tien, 
                may_giat, 
                ban_la, 
                tivi, 
                dieu_hoa, 
                wifi,
                bep,
                do_xe,
                ho_boi,
                ban_ui,
                ma_vi_tri,
                hinh_anh 
            } = req.body;

            let modelPhong = {
                ten_phong, 
                khach, 
                phong_ngu, 
                giuong, 
                phong_tam, 
                mo_ta, 
                gia_tien, 
                may_giat, 
                ban_la, 
                tivi, 
                dieu_hoa, 
                wifi,
                bep,
                do_xe,
                ho_boi,
                ban_ui,
                ma_vi_tri,
                hinh_anh: ""
            }
            let checkViTri = await model.ViTri.findOne({
                where:{id:ma_vi_tri}
            })

            if (role === "ADMIN") {
                if(checkViTri){
                    await model.Phong.create(modelPhong);
                    successCode(res, modelPhong, "Tạo phòng thành công");
                } else { 
                    failCode(res, "", "Mã vị trí không tồn tại");
                }
            } else {
                failCode(res, "", "Bạn không phải admin nên hong tạo phòng được");
            }

        }
    } catch (err) {
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const getPhongtheoVitri = async(req, res) => { 
    try {
        let {ma_vi_tri} = req.query; 
        let data = await model.Phong.findAll({
            where:{ma_vi_tri}   
        }
        );

        if (data[0]) {
            successCode(res, data, "Lấy dữ liệu thành công");
        } else {
            failCode(res, data, "Không tìm thấy dữ liệu");
        }
    }
    catch (err) {
        console.log(err);
        errorCode(res, "Lỗi BE")
    }

}

const getPhongPhantrang = async(req,res) => { 
    try{ 
        let{pageIndex, pageSize, keyword} = req.query;

        if (!keyword){
            keyword = "";
        }

        let dataAll = await model.Phong.findAll();

        let data = await model.Phong.findAll({
            where:{
                ten_phong: {[Op.like]: `%${keyword}%`}
            },
            offset: Number((pageIndex-1) * pageSize),
            limit: Number(pageSize),
            subQuery:false
        });

        let modeUser =  {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
            totalRow: dataAll.length,
            keywords: keyword?keyword:null,
            data
        }

        successCode(res, modeUser, "Lấy dữ liệu thành công");

    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}

const getPhongtheoID = async(req,res) => { 
    try {
        let {id} = req.params;
        let data = await model.Phong.findAll({
            where:{id}
        });

        if (data[0]) {
            successCode(res, data, "Lấy dữ liệu thành công");
        } else {
            failCode(res, data, "Không tìm thấy dữ liệu");
        }
    }
    catch (err) {
        console.log(err);
        errorCode(res, "Lỗi BE")
    }

}

const updatePhong = async(req,res) => { 
    try {
        let { token } = req.headers;
        if (verifyToken(token)) {
            // token hợp lệ
            let {id} = req.params;
            let { role } = parseJwt(token).data;
            let { 
                ten_phong, 
                khach, 
                phong_ngu, 
                giuong, 
                phong_tam, 
                mo_ta, 
                gia_tien, 
                may_giat, 
                ban_la, 
                tivi, 
                dieu_hoa, 
                wifi,
                bep,
                do_xe,
                ho_boi,
                ban_ui,
                ma_vi_tri,
                hinh_anh 
            } = req.body;

            let modelPhong = {
                ten_phong, 
                khach, 
                phong_ngu, 
                giuong, 
                phong_tam, 
                mo_ta, 
                gia_tien, 
                may_giat, 
                ban_la, 
                tivi, 
                dieu_hoa, 
                wifi,
                bep,
                do_xe,
                ho_boi,
                ban_ui,
                ma_vi_tri,
            }
            let checkViTri = await model.ViTri.findOne({
                where:{id:ma_vi_tri}
            })

            let checkID = await model.Phong.findOne({where:{id}});
            

            if (role === "ADMIN") {
                if (checkID){
                    if(checkViTri){
                        await model.Phong.update(modelPhong, {where:{id}});
                        successCode(res, modelPhong, "Update phòng thành công");
                
                    } else { 
                        failCode(res, "", "Mã vị trí không tồn tại");
                    }
                } else {
                    failCode(res, "", "ID không tồn tại");
                }
                
            } else {
                failCode(res, "", "Bạn không phải admin nên hong tạo phòng được");
            }

        }
    } catch (err) {
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}

const deletePhong = async(req,res) => { 
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.params;
            let role = parseJwt(token).data.role;
            let checkPhong = await model.Phong.findOne({where:{id}});
            
            if (role === "ADMIN"){
                if (checkPhong){
                    await model.Phong.destroy({
                        where:{
                            id
                        }
                    })

                    try{
                        fs.unlinkSync(process.cwd() + "/public/img/" + checkPhong.hinh_anh.toString());
                    }catch{}
                    
                    successCode(res, "", "Xóa phòng thành công");
                } else{
                    failCode(res, "", "Phòng không tồn tại");
                }
            }else{ 
                failCode(res, "", "Bạn không phải admin nên không thể xóa phòng");
            }
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}


const uploadImagePhong = async(req, res) => {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.query;
            let {role} = parseJwt(token).data;
            let duong_dan = req.file;

            let modelImamge = {
                hinh_anh: duong_dan.filename.toString(),
            };

            let checkID = await model.Phong.findOne({where: {id}});

            

            if (role === "ADMIN"){
                if(checkID){
                    try{
                        fs.unlinkSync(process.cwd() + "/public/img/" + checkID.hinh_anh.toString());
                    } catch {}
                    
                    await model.Phong.update(modelImamge, {where:{id}});
                    successCode(res, modelImamge, "Upload ảnh thành công");
                } else { 
                    fs.unlinkSync(process.cwd() + "/public/img/" + duong_dan.filename.toString());
                    failCode(res, "", "ID không tồn tại");
                }
            } else {
                fs.unlinkSync(process.cwd() + "/public/img/" + duong_dan.filename.toString());
                failCode(res, "", "Bạn không phải admin nên không thể upload ảnh phòng");
            }
            
        } 

    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}


module.exports = {
    getPhong,
    createPhong,
    getPhongtheoVitri,
    getPhongPhantrang,
    getPhongtheoID,
    updatePhong,
    deletePhong,
    uploadImagePhong
}




