const db = require('./database')

const getListSpecialDate = (date) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT sd.*, ts.id AS detail_id "
                + "FROM hr.special_date AS sd "
                + "LEFT JOIN time_special AS ts ON sd.id = ts.special_date_id "
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
        let sql = "DELETE FROM special_date WHERE id = ?";

        db.query(sql, id, (err, results) => {
            if(err) return reject(err);

            console.log("1 record deleted");

            return resolve(results);
        });
    });
}

const detailSpecialDate = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM special_date WHERE id = ?";

        db.query(sql, id, (err, results) => {
            if(err) return reject(err);

            console.log("Special Date: ", results[0]);

            return resolve(results[0]);
        });
    });
}

const getListRequestOT = (params) => {
    return new Promise((resolve, reject) => {
        let date = params.specialDateFrom;
        let preSelect = "SELECT sd.id, sd.day_special_from, sd.day_special_to, sd.note, sd.type_day, sd.is_approved, sd.staff_request, sd.department_request, sd.staff_ot, "
                            + "CONCAT(s.firstname, ' ', s.lastname) AS full_name_staff_request, s.code, "
                            + "d.name_vn AS name_department_request "
                        + "FROM hr.special_date AS sd "
                        + "LEFT JOIN staff AS s ON sd.staff_request = s.id "
                        + "LEFT JOIN department AS d ON sd.department_request = d.id "
                        + "WHERE DATE_FORMAT(sd.day_special_from, '%Y') = DATE_FORMAT(?, '%Y') ";

        let where = "";
        if(params.staffRequest != 7) {
            where = "AND sd.department_request = " + params.departmentRequest + " OR sd.type_day = 1 ";
        }

        let subSelect = "order by sd.day_special_to";

        let sql = preSelect + where + subSelect;

        db.query(sql, date, (err, results) => {
            if(err) return reject(err);

            console.log('list special date : ', results);
            return resolve(results);
        });
    });
}

const getListTimeSpecial = (idSpecialDate) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT ts.id, ts.staff_id, ts.special_date_id, ts.day_time_special, ts.number_time, ts.multiply, ts.date_create, sd.day_special_to, sd.day_special_from, sd.note, "
                            + "CONCAT(s.firstname, ' ', s.lastname) AS full_name, s.is_manager, "
                            + "d.name_vn AS department_name "
                        + "FROM time_special AS ts "
                        + "LEFT JOIN special_date AS sd ON ts.special_date_id = sd.id "
                        + "LEFT JOIN staff AS s ON ts.staff_id = s.id "
                        + "LEFT JOIN department AS d ON s.department = d.id "
                        + "WHERE ts.special_date_id = ? "
                        + "ORDER BY ts.day_time_special";

        db.query(sql, idSpecialDate, (err, results) => {
            if(err) return reject(err);

            console.log('list time special : ', results);
            return resolve(results);
        });
    });
}

const saveTimeSpecial = (params) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO time_special (staff_id, special_date_id, day_time_special, number_time, multiply, date_create) VALUES (?, ?, ?, ?, ?, ?)";

        db.query(sql, params, (err, results) => {
            if(err) return reject(err);

            console.log('Inserted 1 record Time Special!');
            return resolve(results);
        });
    });
}

module.exports = {
    getListSpecialDate: getListSpecialDate,
    create: create,
    updateSpecialDate: updateSpecialDate,
    deleteSpecialDate: deleteSpecialDate,
    detailSpecialDate: detailSpecialDate,
    getListRequestOT: getListRequestOT,
    getListTimeSpecial: getListTimeSpecial,
    saveTimeSpecial: saveTimeSpecial
};