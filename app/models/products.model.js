//Example
const db = require('./database')

const getAll = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM products";
        db.query(sql, (err, results) => {
            if(err) return reject(err);

            return resolve(results);
        });
    });
}

module.exports = {
    getAll: getAll,
};