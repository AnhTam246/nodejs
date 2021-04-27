//Example
const express = require('express')
const router = express.Router()

const specialDateController = require('../controllers/specialDate.controller')
const authMiddleWare = require('../middleware/AuthMiddleware');

router.get('/list-special-date', authMiddleWare.isAuth, specialDateController.getListSpecialDate);

router.post('/create', authMiddleWare.isAuth, specialDateController.createSpecialDate);

router.put('/update', authMiddleWare.isAuth, specialDateController.updateSpecialDate);

router.delete('/delete', authMiddleWare.isAuth, specialDateController.deleteSpecialDate);

router.get('/list-request-ot', authMiddleWare.isAuth, specialDateController.getListRequestOT);

router.get('/list-time-special', authMiddleWare.isAuth, specialDateController.getListTimeSpecial);

router.post('/save-time-special', authMiddleWare.isAuth, specialDateController.saveTimeSpecial);

router.get('/detail-special-date/:id', authMiddleWare.isAuth, specialDateController.detailSpecialDate);

module.exports = router;