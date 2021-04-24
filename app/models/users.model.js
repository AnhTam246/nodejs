const db = require('./database')

const list = (result) => {
    let sql = "SELECT * FROM users";
    db.query(sql, (err, res) => {
        if (err) throw err;

        console.log('users : ', res);
        result(null, res);
    })
}

const listSearch = (name, result) => {
    let sql = "SELECT * FROM users WHERE name like '%" + name + "%'";
    db.query(sql, (err, res) => {
        if (err) throw err;

        console.log('users : ', res);
        result(null, res);
    })
}

const postCreate = (params, result) => {
    //Insert a record in the "users" table:
    var sql = "INSERT INTO users (name, age, password) VALUES (?, ?, ?)";
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log("1 record inserted");

        result(null, res);
    });
}

const getUserById = (userId, result) => {
    let sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, userId , (err, res) => {
        if (err) throw err;

        console.log('users : ', res[0]);
        result(null, res[0]);
    })
}

module.exports = {
    list: list,
    listSearch: listSearch,
    postCreate: postCreate,
    getUserById: getUserById
};