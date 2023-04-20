// const User = require("../models/user");
const {Sequelize} = require("sequelize");
const {successCode,failCode,errorCode} = require('../config/response')

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {generateToken, verifyToken, parseJwt} = require("../config/jwt");

const bcrypt = require('bcrypt'); 
const fs = require('fs');
const { triggerAsyncId } = require("async_hooks");



const Op = Sequelize.Op;



//----------------------------------------- MAIN -------------------------------------
const login = async (req, res) => {
    try{
        let {email, pass_word} = req.body;

        let modelUser = { 
            email, 
            pass_word
        };

        let checkEmail = await model.NguoiDung.findOne({
            where: { 
                email
            }
        })

        if (checkEmail){
            let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
            if (checkPass){
                let token = generateToken({data: {...checkEmail.dataValues, pass_word: ""}});
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

        
        let {name, email, pass_word, phone, birth_day, gender, role} = req.body;

        let modelUser = {
            name,
            email, 
            pass_word: bcrypt.hashSync(pass_word, 10),
            phone, 
            birth_day,
            gender, 
            role
        };


        let checkEmail = await model.NguoiDung.findOne({
            where: { 
                email
            }
        })

        if (checkEmail){
            failCode(res, modelUser, "Email đã tồn tại !");
        } else { 
            await model.NguoiDung.create(modelUser);
            successCode(res, modelUser, "Tạo mới thành công");
        }

        
    }
    catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}


const getUser = async (req,res) => {
    try {
        let data = await model.NguoiDung.findAll();
        
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

const createUser = async(req, res) => {
    try{
        let {name, email, pass_word, phone, birth_day, gender, role} = req.body;

        let modelUser = {
            name,
            email, 
            pass_word: bcrypt.hashSync(pass_word, 10),
            phone, 
            birth_day,
            gender, 
            role
        };


        let checkEmail = await model.NguoiDung.findOne({
            where: { 
                email
            }
        })

        if (checkEmail){
            failCode(res, modelUser, "Email đã tồn tại !");
        } else { 
            await model.NguoiDung.create(modelUser);
            successCode(res, modelUser, "Tạo mới thành công");
        }

        
    }
    catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
};

const deleteUser = async(req, res) =>  {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.query;
            let role = parseJwt(token).data.role;
            let checkNguoiDung = await model.NguoiDung.findOne({where:{id}});
            
            if (role === "ADMIN"){
                if (checkNguoiDung){
                    await model.NguoiDung.destroy({
                        where:{
                            id
                        }
                    })

                    try{
                        fs.unlinkSync(process.cwd() + "/public/img/" + checkNguoiDung.avatar.toString());
                    } catch {}
                    
                    successCode(res, "", "Xóa người dùng thành công");
                } else{
                    failCode(res, "", "Người dùng không tồn tại");
                }

            }else if (id === parseJwt(token).data.id){
                await model.NguoiDung.destroy({
                    where:{id}
                })

                try{
                    fs.unlinkSync(process.cwd() + "/public/img/" + checkNguoiDung.avatar.toString());
                } catch {}
                
                successCode(res, "", "Xóa người dùng thành công");
            } else{ 
                failCode(res, "", "Bạn không phải admin nên không thể xóa người dùng này");
            }
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
}

const getUserPhanTrang = async(req, res) => {
    try{ 
        let{pageIndex, pageSize, keyword} = req.query;

        if (!keyword){
            keyword = "";
        }

        let dataAll = await model.NguoiDung.findAll();

        let data = await model.NguoiDung.findAll({
            where:{
                name: {[Op.like]: `%${keyword}%`}
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

const getUserbyID = async(req,res) => { 
    try {
        let {id} = req.params;
        let data = await model.NguoiDung.findAll({where:{id}});
        
        if(data[0]){                
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

const updateUser = async (req,res) => {
    try { 
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = req.params;
            let roleCheck = parseJwt(token).data.role;
            let idCheck = parseJwt(token).data.id;

            let {name, email, pass_word, phone, birth_day, gender, role} = req.body;

            let modelUser = {
                name,
                email, 
                pass_word: bcrypt.hashSync(pass_word, 10),
                phone, 
                birth_day,
                gender, 
                role
            };

            let checkEmail = await model.NguoiDung.findOne({
                where: { 
                    email
                }
            })

            let checkID = await model.NguoiDung.findOne({
                where: { 
                    id:idCheck
                }
            })

            let checkNguoiDung = await model.NguoiDung.findOne({
                where: { 
                    id
                }
            })

            
            
            if (roleCheck === "ADMIN") { 
                if (!checkNguoiDung){
                    failCode(res, modelUser, "ID không tồn tại !");
                } else if (checkNguoiDung.email === email || !checkEmail) {     
                    await model.NguoiDung.update(modelUser, {
                        where:{
                            id, 
                        }
                    })
                    successCode(res, modelUser, `Update thông tin của ID:${id} thành công`);
                }else if (checkEmail){
                    failCode(res, modelUser, "Email đã tồn tại !");
                }

            } else if (id == idCheck) { 
                if (checkID.email === email || !checkEmail) {    
                    await model.NguoiDung.update(modelUser, {
                        where:{
                            id, 
                        }
                    })
                    successCode(res, modelUser, "Update thông tin của bạn thành công");
                }else if (checkEmail){
                    failCode(res, modelUser, "Email đã tồn tại !");
                }
            } else { 
                failCode(res, "", "Bạn không phải admin nên không thể sửa người dùng này");
            }
        }
    }
    catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE")
    }
    
}

const getUserbyName = async (req, res) => {
    try {
        let {name} = req.params;
        let data = await model.NguoiDung.findAll({
            where:{
                name:{[Op.like]: `%${name}%`}
            }
        });
        
        if(data[0]){                
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

const uploadAvatar = async(req, res) => {
    try{
        let {token} = req.headers; 
        if (verifyToken(token)){
            let {id} = parseJwt(token).data;
            let duong_dan = req.file;

            console.log(duong_dan);

            let modelImage = {
                avatar: duong_dan.filename.toString(),
            };

            let checkId = await model.NguoiDung.findOne({where:{id}});

            try{
                fs.unlinkSync(process.cwd() + "/public/img/" + checkId.avatar.toString());
            } catch {}
            
            await model.NguoiDung.update(modelImage, {where:{id}});
            successCode(res, modelImage, "Upload ảnh thành công");
        } 
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }
}


module.exports = { 
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserPhanTrang,
    getUserbyID,
    getUserbyName,
    signUp,
    login,
    uploadAvatar
}   
