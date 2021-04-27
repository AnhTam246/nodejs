const specialDateModel = require('../models/specialDate.model');

const getListSpecialDate = async (req, res) => {
    try {
        let date = req.query.special_date_from;
        let listSpecialDate = await specialDateModel.getListSpecialDate(date);

        let responseHandle = {
            data: listSpecialDate,
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

const create = async (req, res) => {
    try {
        //Create Special Date
        let params = [
            req.body.day_special_from,
            req.body.day_special_to,
            req.body.note,
            req.body.type_day
        ];

        //Create Request OT
        if(req.body.type_day == "2") {
            params.push(req.body.staff_request);
            params.push(req.body.department_request);
            params.push(parseInt(req.body.is_approved));
            params.push(req.body.string_staff_ot);
        }
        
        let specialDateInsert = await specialDateModel.create(params);

        let responseHandle = {
            data: specialDateInsert,
            message: "Save SpecialDate Success",
            status: 200,
            isSuccess: true
        }

        res.send(responseHandle);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateSpecialDate = async (req, res) => {
    try {
        console.log(req.body);
        //Update Special Date
        let params = [
            req.body.day_special_from,
            req.body.day_special_to,
            req.body.note,
            req.body.id
        ];

        if(req.body.type_day == "2") {
            //update request ot
        }
        
        let specialDateUpdate = await specialDateModel.updateSpecialDate(req.body.type_day ,params);

        let responseHandle = {
            data: specialDateUpdate,
            message: "Update Success",
            status: 200,
            isSuccess: true
        }

        res.send(responseHandle);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const deleteSpecialDate = async (req, res) => {
    try {
        //Delete Special Date
        let id = req.body.id;
        
        let specialDateDelete = await specialDateModel.deleteSpecialDate(id);

        let responseHandle = {
            data: specialDateDelete,
            message: "Delete Success",
            status: 200,
            isSuccess: true
        }

        res.send(responseHandle);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const detailSpecialDate = async (req, res) => {
    try {
        //Delete Special Date
        let id = req.params.id;
        
        let specialDate = await specialDateModel.detailSpecialDate(id);

        let responseHandle = {
            data: specialDate,
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

const getListRequestOT = async (req, res) => {
    try {
        let params = {
            specialDateFrom: req.query.special_date_from,
            staffRequest: req.query.staff_request,
            departmentRequest: req.query.department_request
        };

        let listRequestOT = await specialDateModel.getListRequestOT(params);
        
        let responseHandle = {
            data: listRequestOT,
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
    getListSpecialDate: getListSpecialDate,
    create: create,
    updateSpecialDate: updateSpecialDate,
    deleteSpecialDate: deleteSpecialDate,
    detailSpecialDate: detailSpecialDate,
    getListRequestOT: getListRequestOT
};