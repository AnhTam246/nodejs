const db = require('./database')

const getAll = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT s.*, d.name as department_name " 
                + "FROM staff AS s "
                + "LEFT JOIN department AS d on s.department = d.id "
                + "WHERE s.status = 0";

        db.query(sql, (err, results) => {
            if(err) return reject(err);

            console.log('staffs : ', results);
            return resolve(results);
        });
    });
}

const getOne = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT s.*, d.name as department_name " 
                + "FROM staff AS s "
                + "LEFT JOIN department AS d on s.department = d.id "
                + "WHERE s.status = 0 "
                + "AND s.id = ?";

        db.query(sql, [id], (err, results) => {
            if(err) return reject(err);

            console.log('staff : ', results[0]);
            return resolve(results[0]);
        });
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};