const userModel = require('../models/users.model');

const index = (req, res) => {
    userModel.list(function(err, response) {
        if (err) throw err;
        let responseHandle = {
            data: response,
            message: "Request Success",
            status: 200,
            isSuccess: true
        }
        res.send(responseHandle);
    });
}

const search = (req, res) => {
    let name = req.query.name;
    userModel.listSearch(name, function(err, response) {
        if (err) throw err;
        let responseHandle = {
            data: response,
            message: "Request Success",
            status: 200,
            isSuccess: true
        }
        res.send(responseHandle);
    });
}

const postCreate = (req, res) => {
    let params = [
        req.body.name,
        req.body.age,
        req.body.password
    ];

    //Insert a record in the "users" table:
    userModel.postCreate(params, function(err, response) {
        if (err) throw err;
        let responseHandle = {
            data: response.insertId,
            message: "Create Success",
            status: 200,
            isSuccess: true
        }
        console.log(responseHandle);
        res.send(responseHandle);
    });
};

const getUser = (req, res) => {
    let id = req.params.id;

    userModel.getUserById(id, function(err, response) {
        if (err) throw err;
        let responseHandle = {
            data: response,
            message: "Request Success",
            status: 200,
            isSuccess: true
        }

        if(!response) {
            responseHandle.data = "Can't find id";
            responseHandle.message = "Invalid id";
            responseHandle.isSuccess = false;
        }

        res.send(responseHandle);
    });
};

module.exports = {
    index: index,
    search: search,
    postCreate: postCreate,
    getUser: getUser
};