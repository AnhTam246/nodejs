//Example
const express = require('express')
const router = express.Router()

const controller = require('../controllers/users.controller')
const validate = require('../validates/users.validate')
const authMiddleWare = require('../middleware/AuthMiddleware')

router.get('/', authMiddleWare.isAuth, controller.index);

router.get('/search', authMiddleWare.isAuth, controller.search);

router.post('/create', authMiddleWare.isAuth, validate.postCreate, controller.postCreate);

router.get('/:id', authMiddleWare.isAuth, controller.getUser);

module.exports = router;