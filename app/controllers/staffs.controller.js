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

const fetchPagination = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let params = {
            'department_name': req.query.department_name
        }
            
        let staffs = await staffModel.fetchPagination(page, params);
        let total = await staffModel.getCountTotal();
        let result = {
            staffs: staffs,
            total: total
        }

        let responseHandle = {
            data: result,
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

const findStaffInDepartment = async (req, res) => {
    try {
        //Delete Special Date
        let department = req.params.department;
        
        let staffs = await staffModel.findStaffInDepartment(department);

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
    getAll: getAll,
    getOne: getOne,
    getStaffLogin: getStaffLogin,
    fetchPagination: fetchPagination,
    findStaffInDepartment: findStaffInDepartment
};