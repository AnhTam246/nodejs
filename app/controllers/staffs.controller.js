const staffModel = require('../models/staffs.model');

const getAll = async (req, res) => {
    try {
        let staffs = await staffModel.getAll();

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

const getOne = async (req, res) => {
    try {
        let id = req.params.id;
        let staff = await staffModel.getOne(id);

        let responseHandle = {
            data: staff,
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

const getStaffLogin = async (req, res) => {
    try {
        let responseHandle = {
            data: res.locals.staff,
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

// const fetchPagination = async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

module.exports = {
    getAll: getAll,
    getOne: getOne,
    getStaffLogin: getStaffLogin
};