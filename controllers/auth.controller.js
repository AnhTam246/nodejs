const connection = require('../config')
// const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const jwtHelper = require("../helpers/jwt.helper");
// Thời gian sống của token
const accessTokenLife = process.env.TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.TOKEN_SECRET || "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

module.exports.postLogin = (req, res) => {
    try {
        var sql = "SELECT * FROM users WHERE name = ? AND password = ?";
        connection.query(sql, [req.body.name, req.body.password], function(err, results) {
            if (err) throw err;

            let responseHandle = {
                data: null,
                status: 200,
                message: "Request Success",
                isSuccess: true              
            }

            if(!results.length) {
                responseHandle.message = "Invalid User";
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