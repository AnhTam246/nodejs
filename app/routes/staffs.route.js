//Example
const express = require('express')
const router = express.Router()

const staffController = require('../controllers/staffs.controller')
// const validate = require('../validates/staffs.validate')
const authMiddleWare = require('../middleware/AuthMiddleware')

router.get('/', authMiddleWare.isAuth, staffController.getAll);

router.get('/fetch-pagination', authMiddleWare.isAuth, staffController.fetchPagination);

router.get('/get-staff-login', authMiddleWare.isAuth, staffController.getStaffLogin);

router.get('/find-staff-department/:department', authMiddleWare.isAuth, staffController.findStaffInDepartment);

router.get('/:id', authMiddleWare.isAuth, staffController.getOne);


module.exports = router;