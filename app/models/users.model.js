const db = require('./database')

// let data = [];

const list = () => {
    var sql = `SELECT * FROM users`;
    db.query(sql, function(err, results) {
        if (err) throw err;

        data = results;
    });

    return data;
}

const listSearch = (name) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE name like '%" + name + "%'";
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    list: list,
    listSearch: listSearch
};