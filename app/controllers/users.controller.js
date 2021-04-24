const connection = require('../../config');
const userModel = require('../models/users.model');

const index = (req, res) => {   
    try {
        //console.log(res.locals.user);
        let users = userModel.list();

        let responseHandle = {
            data: users,
            message: "Request Success",
            status: 200,
            isSuccess: true
        }
        res.send(responseHandle);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const search = (req, res) => {
    try {
        let name = req.query.name;
        let responseHandle = {
            data: [],
            message: "Request Success",
            status: 200,
            isSuccess: true
        }

        userModel.listSearch(name).then((result) => {
            responseHandle.data = result;
            res.send(responseHandle);
        });
      
    } catch (error) {
        return res.status(500).json(error);
    }
};

const create = (req, res) => {
    res.render('users/create')
};

const postCreate = (req, res) => {
    //Insert a record in the "users" table:
    var sql = "INSERT INTO users (name, age) VALUES ('"+req.body.name+"', '"+req.body.age+"')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        //Send variable from function middleware
        console.log(res.locals);

        let responseHandle = {
            data: result.insertId,
            message: "Create Success",
            status: 200,
            isSuccess: true
        }
    
        res.send(responseHandle);
    });
};

const getUser = (req, res) => {
    let id = req.params.id;

    var sql = "SELECT * FROM users WHERE id = " + id;
    connection.query(sql, function(err, results) {
        if (err) throw err;

        let responseHandle = {
            data: results[0],
            message: "Request Success",
            status: 200,
            isSuccess: true
        }

        if(!results.length) {
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
    create: create,
    postCreate: postCreate,
    getUser: getUser
};