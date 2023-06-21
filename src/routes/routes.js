

const connection = require('../database/connection')
const express = require('express')
const router = express.Router()

/*  Conexão com os controllers */
const userController = require('../controllers/userController')
const pointController = require('../controllers/pointController')
const categoryController  = require('../controllers/categoryController')
const discardController = require('../controllers/discardController')

const categoryDiscardPointController = require('../controllers/categoryDiscardPointController')
const categoryResidueDiscardController = require('../controllers/categoryResidueDiscardController')


/*  Rotas para manipular usuários */ 

router.post('/novoUsuario', userController.createUser)
router.get('/usuarios', userController.getAll)
router.get('/usuarios/:idUsuario', userController.getById)
router.put('/atualizar/usuario/:idUsuario', userController.updateUser)
router.delete('/delete/usuario/:idUsuario', userController.deleteUser)

/* Rotas para manipular pontos de coleta */ 

router.post('/novoPonto', pointController.createPoint)
router.get('/pontos', pointController.getAll)
router.get('/pontos/:idPontoDeColeta', pointController.getById)
router.put('/atualizar/ponto/:idPontoDeColeta', pointController.updatePoint)
router.delete('/delete/ponto/:idPontoDeColeta', pointController.deletePoint)

/*  Rotas para manipular categorias de residuos */ 

router.post('/novaCategoria', categoryController.createCategory)
router.get('/categorias', categoryController.getAll)
router.get('/categorias/:idCategoria', categoryController.getById)
router.put('/atualizar/categoria/:idCategoria', categoryController.updateCategory)
router.delete('/delete/categoria/:idCategoria', categoryController.deleteCategory)


/* Rotas para manipular as categorias de residuo aceitas nos postos de coleta*/

router.post('/novaCategoriaDescartePonto', categoryDiscardPointController.createCategoryDiscardPoint)
router.get('/categoriasDescartePonto', categoryDiscardPointController.getAll)
router.get('/categoriasDescartePonto/:idPontoColeta/:idCategoria', categoryDiscardPointController.getById)
// router.put('/atualizar/categoria/:idCategoria', categoryController.updateCategory)
router.delete('/delete/categoriasDescartePonto', categoryDiscardPointController.deleteCategoryDiscardPoint)


/*Rotas para manipular as categorias de resíduo em um descarte feito por um usuario*/

router.post('/novaCategoriaResiduoDescarte', categoryResidueDiscardController.createCategoryResidueDiscard)
router.get('/categoriasResiduoDescarte', categoryResidueDiscardController.getAll)
router.get('/categoriasResiduoDescarte/:idUsuario/:idPontoColeta/:idCategoria', categoryResidueDiscardController.getById)
router.delete('delete/categoriaResiduoDescarte', categoryResidueDiscardController.deleteCategoryResidueDiscard)


/*Rotas para manipular descartes*/

router.post('/novoDescarte', discardController.createDescarte)
router.get('/descartes',discardController.getAll)
router.get('/descartes/:idUsuario', discardController.getByIdUsuario)

module.exports = router
