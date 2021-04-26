const db = require('./database');

const getStaffMonth = () => {
    return new Promise((resolve, reject) => {
        let sql = "CALL GetStaffMonth()";

        db.query(sql, (err, results) => {
            if(err) return reject(err);

            console.log('staff month : ', results[0][0]);
            return resolve(results[0][0]);
        });
    });
}

const getStaffEducation = () => {
    return new Promise((resolve, reject) => {
        let sql = "CALL GetCountLevelEducation()";

        db.query(sql, (err, results) => {
            if(err) return reject(err);

            console.log('staff education : ', results[0][0]);
            return resolve(results[0][0]);
        });
    });
}

const getTN = () => {
    return new Promise((resolve, reject) => {
        let sql = "CALL GetTN()";

        db.query(sql, (err, results) => {
            if(err) return reject(err);

            console.log('staff tn : ', results[0][0]);
            return resolve(results[0][0]);
        });
    });
}

const getStaffOffDateMonth = () => {
    return new Promise((resolve, reject) => {
        let sql = "CALL GetStaffOffDateMonth()";

        db.query(sql, (err, results) => {
            if(err) return reject(err);

            console.log('staff offdate month : ', results[0][0]);
            return resolve(results[0][0]);
        });
    });
}


module.exports = {
    getStaffMonth: getStaffMonth,
    getStaffEducation: getStaffEducation,
    getTN: getTN,
    getStaffOffDateMonth: getStaffOffDateMonth
};