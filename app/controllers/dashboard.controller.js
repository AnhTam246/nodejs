const dashboardModel = require('../models/dashboard.model');


const getStaffMonth = async (req, res) => {
    try {
        let results = await dashboardModel.getStaffMonth();

        let responseHandle = {
            data: results,
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

const getStaffEducation = async (req, res) => {
    try {
        let results = await dashboardModel.getStaffEducation();

        let responseHandle = {
            data: results,
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

const getTN = async (req, res) => {
    try {
        let results = await dashboardModel.getTN();

        let responseHandle = {
            data: results,
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

const getStaffOffDateMonth = async (req, res) => {
    try {
        let results = await dashboardModel.getStaffOffDateMonth();

        let responseHandle = {
            data: results,
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
    getStaffMonth: getStaffMonth,
    getStaffEducation: getStaffEducation,
    getTN: getTN,
    getStaffOffDateMonth: getStaffOffDateMonth
};