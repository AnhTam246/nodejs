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
        console.log(params);
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

module.exports = {
    getListSpecialDate: getListSpecialDate,
    create: create,
    updateSpecialDate: updateSpecialDate,
    deleteSpecialDate: deleteSpecialDate,
    detailSpecialDate: detailSpecialDate,
    getListRequestOT: getListRequestOT
};