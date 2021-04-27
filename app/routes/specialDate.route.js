//Example
const express = require('express')
const router = express.Router()

const specialDateController = require('../controllers/specialDate.controller')
const authMiddleWare = require('../middleware/AuthMiddleware');

router.get('/list-special-date', authMiddleWare.isAuth, specialDateController.getListSpecialDate);

router.post('/create', authMiddleWare.isAuth, specialDateController.create);

router.put('/update', authMiddleWare.isAuth, specialDateController.updateSpecialDate);

router.delete('/delete', authMiddleWare.isAuth, specialDateController.deleteSpecialDate);

router.get('/list-request-ot', authMiddleWare.isAuth, specialDateController.getListRequestOT);

router.get('/detail-special-date/:id', authMiddleWare.isAuth, specialDateController.detailSpecialDate);

module.exports = router;