const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/novoUsuario', userController.createUser)
router.get('/usuarios', userController.getAll)
router.get('/usuarios/:idUsuario', userController.getById)

module.exports = router
