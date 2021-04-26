const db = require('./database')

const getListSpecialDate = (date) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT sd.*, ts.id AS detail_id "
                + "FROM hr.`special_date` AS sd "
                + "LEFT JOIN `time_special` AS ts ON sd.`id` = ts.`special_date_id` "
                + "WHERE DATE_FORMAT(sd.day_special_from, '%Y') = DATE_FORMAT(?, '%Y') "
                + "GROUP BY sd.id";

        db.query(sql, date, (err, results) => {
            if(err) return reject(err);

            console.log('list special date : ', results);
            return resolve(results);
        });
    });
}

const create = (params) => {
    return new Promise((resolve, reject) => {
        let sql = "";
        if(params[3] == "1") {
            sql = "INSERT INTO special_date (day_special_from, day_special_to, note, type_day) VALUES (?, ?, ?, ?)";
        } else {
            sql = "INSERT INTO special_date (day_special_from, day_special_to, note, type_day, staff_request, department_request, is_approved, staff_ot) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        }

        db.query(sql, params, (err, results) => {
            if(err) return reject(err);

            if(params[3] == "1") console.log("1 Special Date inserted");
            else console.log("1 Request OT inserted");

            return resolve(results);
        });
    });
}

const updateSpecialDate = (typeDay ,params) => {
    return new Promise((resolve, reject) => {
        let sql = "";
        if(typeDay == "1") {
            sql = "UPDATE special_date "
                + "SET day_special_from = ?, day_special_to = ?, note = ? "
                + "WHERE id = ?";
        }

        db.query(sql, params, (err, results) => {
            if(err) return reject(err);

            if(typeDay == "1") console.log("1 Special Date updated");
            else console.log("1 Request OT updated");

            return resolve(results);
        });
    });
}

const deleteSpecialDate = (id) => {
    return new Promise((resolve, reject) => {
        console.log(id);
        let sql = "DELETE FROM special_date WHERE id = ?";

        db.query(sql, id, (err, results) => {
            if(err) return reject(err);

            console.log("1 record deleted");

            return resolve(results);
        });
    });
}

module.exports = {
    getListSpecialDate: getListSpecialDate,
    create: create,
    updateSpecialDate: updateSpecialDate,
    deleteSpecialDate: deleteSpecialDate
};