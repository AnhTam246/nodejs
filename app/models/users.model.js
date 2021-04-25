//Example
const db = require('./database')

const list = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users";
        db.query(sql, (err, results) => {
            if(err) return reject(err);

            console.log('users : ', results);
            return resolve(results);
        });
    });
}

const listSearch = (name) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE name like '%" + name + "%'";
        db.query(sql, (err, results) => {
            if (err) return  reject(err);

            console.log('users : ', results);
            return resolve(results);
        })
    });
}

const postCreate = (params) => {
    return new Promise((resolve, reject) => {
        //Insert a record in the "users" table:
        var sql = "INSERT INTO users (name, age, password) VALUES (?, ?, ?)";
        db.query(sql, params, (err, results) => {
            if (err) return  reject(err);

            console.log("1 record inserted");
            return resolve(results);
        });
    });
}

const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE id = ?";
        db.query(sql, [userId] , (err, results) => {
            if (err) return  reject(err);
    
            console.log('user : ', results[0]);
            return results ? resolve(results[0]) : null;
        })
    });
}

module.exports = {
    list: list,
    listSearch: listSearch,
    postCreate: postCreate,
    getUserById: getUserById
};