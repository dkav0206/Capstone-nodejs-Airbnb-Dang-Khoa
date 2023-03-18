const jwt = require('jsonwebtoken');
const generateToken = (data) => {
    let token = jwt.sign(data, "private",{expiresIn: "10h"});
    return token; 
}


//kiểm tra token hợp lệ hay không
const verifyToken = (token) => {
    let checkToken = jwt.verify(token, "private");
    return checkToken; 
}


const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports ={ 
    generateToken, 
    verifyToken,
    parseJwt
}