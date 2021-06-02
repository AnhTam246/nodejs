//Example
const userModel = require('../models/users.model');

const index = async (req, res) => {
    try {
        let users = await userModel.list();

        let responseHandle = {
            data: users,
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

const search = async (req, res) => {
    try {
        let name = req.query.name;

        let users = await userModel.listSearch(name);

        let responseHandle = {
            data: users,
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

const postCreate = async (req, res) => {
    try {
        let params = [
            req.body.name,
            req.body.age,
            req.body.password
        ];

        let userInsert = await userModel.postCreate(params);

        let responseHandle = {
            data: userInsert.insertId,
            message: "Create Success",
            status: 200,
            isSuccess: true
        }
        
        res.send(responseHandle);    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const getUser = async (req, res) => {
    let id = req.params.id;

    let user = await userModel.getUserById(id);

    let responseHandle = {
        data: user,
        message: "Request Success",
        status: 200,
        isSuccess: true
    }

    if(!user) {
        responseHandle.data = "Can't find id";
        responseHandle.message = "Invalid id";
        responseHandle.isSuccess = false;
    }

    res.send(responseHandle);
};

module.exports = {
    index: index,
    search: search,
    postCreate: postCreate,
    getUser: getUser
};