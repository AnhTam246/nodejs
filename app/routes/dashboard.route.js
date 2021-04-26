//Example
const express = require('express')
const router = express.Router()

const dashboardController = require('../controllers/dashboard.controller')
const authMiddleWare = require('../middleware/AuthMiddleware')

router.get('/get-staff-month', authMiddleWare.isAuth, dashboardController.getStaffMonth);

router.get('/get-staff-education', authMiddleWare.isAuth, dashboardController.getStaffEducation);

router.get('/get-tn', authMiddleWare.isAuth, dashboardController.getTN);

router.get('/get-staff-off-date-month', authMiddleWare.isAuth, dashboardController.getStaffOffDateMonth);


module.exports = router;