const productModel = require('../models/products.model');

const getAll = async (req, res) => {
    try {
        
        let staffs = await productModel.getAll();

        let responseHandle = {
            data: staffs,
            message: "Request Success",
            status: 200,
            isSuccess: true
        }

        res.send(responseHandle);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getAll: getAll
};