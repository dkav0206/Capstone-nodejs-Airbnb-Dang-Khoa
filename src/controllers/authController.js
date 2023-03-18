const { verifyToken } = require("../config/jwt");

const checkToken = (req, res, next) => {
    try{
        //token.replace("bearer ","");
        //check token
        //true => next()
        //false => res.send("Báo sai token");
        let {token} = req.headers; 
        if (verifyToken(token)){
            // token hợp lệ
            next()
        }
    }catch(err){
        res.status(401).send(err);
    }
}

module.exports = { 
    checkToken
}
