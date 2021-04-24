const jwtHelper = require("../helpers/jwt.helper");
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.TOKEN_SECRET || "09f26e402586e2faa8da4c98a35f1b20d6b033c60";
/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
module.exports.isAuth = (req, res, next) => {
    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    // console.log(tokenFromClient);
    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            const decoded = jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            console.log(decoded);
            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded;
            // Cho phép req đi tiếp sang controller.
            next();
        } catch (error) {
            console.log(error);
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
}
