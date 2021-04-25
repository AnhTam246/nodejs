const CryptoJS = require('crypto-js');
const db = require('../models/database')
// const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const jwtHelper = require("../helpers/jwt.helper");
// Thời gian sống của token
const accessTokenLife = process.env.TOKEN_LIFE || "2h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.TOKEN_SECRET || "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

const postLogin = (req, res) => {
    try {
        let sql = "SELECT s.*, d.name as department_name " 
        + "FROM staff AS s "
        + "LEFT JOIN department AS d on s.department = d.id "
        + "WHERE s.status = 0 "
        + "AND email = ? "
        + "AND password = ?";

        let params = [
            req.body.email, 
            CryptoJS.MD5(req.body.password).toString()
        ];

        db.query(sql, params, function(err, results) {
            if (err) throw err;

            let responseHandle = {
                data: null,
                status: 200,
                message: "Request Success",
                isSuccess: true              
            }

            if(!results.length) {
                responseHandle.message = "Invalid Staff";
                responseHandle.isSuccess = false;
            }

            if(results.length) {
                const accessToken = jwtHelper.generateToken(results[0], accessTokenSecret, accessTokenLife);
                responseHandle.data = accessToken;
                responseHandle.message = "Request Success";
            }
 
            res.send(responseHandle);
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    postLogin: postLogin
};