const connection = require('../connection');

module.exports.index = (req, res) => {   
    var sql = "SELECT * FROM users";
    connection.query(sql, function(err, results) {
        if (err) throw err;

        let responseHandle = {
            data: results,
            message: "Request Success",
            status: 200,
            isSuccess: true
        }
        res.send(responseHandle);
    });
};

module.exports.search = (req, res) => {
    let q = req.query.q;
    var sql = "SELECT * FROM users WHERE name like '%" + q + "%'";
    connection.query(sql, function(err, results) {
        if (err) throw err;

        let responseHandle = {
            data: results,
            message: "Request Success",
            status: 200,
            isSuccess: true
        }
        res.send(responseHandle);
    });
};

module.exports.create = (req, res) => {
    res.render('users/create')
};

module.exports.postCreate = (req, res) => {
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

module.exports.getUser = (req, res) => {
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