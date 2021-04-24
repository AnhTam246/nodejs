const jwt = require("jsonwebtoken");
 /**
  * private function generateToken
  * @param user 
  * @param secretSignature 
  * @param tokenLife 
  */
let generateToken = (user, secretSignature, tokenLife) => {
    const userData = {
        id: user.id,
        name: user.name,
    }
    // Thực hiện ký và tạo token
    return jwt.sign(
        userData,
        secretSignature,
        {
            algorithm: "HS256",
            expiresIn: tokenLife,
        });
}
 /**
  * This module used for verify jwt token
  * @param {*} token 
  * @param {*} secretKey 
  */
let verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey);
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};