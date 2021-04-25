const postCreate = (req, res, next) => {
    var errors = [];
    if(!req.body.name) {
        errors.push("Name is required");
    }

    if(!req.body.age) {
        errors.push("Age is required");
    }

    if(errors.length) {
        let responseHandle = {
            data: errors,
            message: "Invalid",
            status: 200,
            isSuccess: false
        }
        res.send(responseHandle);
        return;
    }

    //Send variable to controller
    res.locals.success = true;

    next();
}

module.exports = {
    postCreate: postCreate
};