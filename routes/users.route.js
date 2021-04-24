const express = require('express')
const router = express.Router()

const controller = require('../controllers/users.controller')
const validate = require('../validates/users.validate')
const authMiddleWare = require('../middleware/AuthMiddleware')

router.get('/', authMiddleWare.isAuth, controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.getUser);


module.exports = router;