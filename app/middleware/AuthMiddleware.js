const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = process.env.TOKEN_SECRET || "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

const isAuth = (req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    
    if (tokenFromClient) {
        try {
            // Decode
            const decoded = jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            // Save token
            res.locals.staff = decoded;

            next();
        } catch (error) {
            console.log(error);
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        // No Token
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
}

module.exports = {
    isAuth: isAuth
};