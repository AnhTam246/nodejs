const jwt = require("jsonwebtoken");
 /**
  * private function generateToken
  * @param user 
  * @param secretSignature 
  * @param tokenLife 
  */
let generateToken = (staff, secretSignature, tokenLife) => {
    const staffData = {
        id: staff.id,
        firstname: staff.firstname,
        lastname: staff.lastname,
        isManager: staff.is_manager,
        gender: staff.gender,
        email: staff.email,
        status: staff.status,
        department: staff.department,
        departmentName: staff.department_name
    }
    // Thực hiện ký và tạo token
    return jwt.sign(
        staffData,
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