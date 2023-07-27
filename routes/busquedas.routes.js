const {Router}=require('express')
const { getTodo } = require('../controllers/busqueda.controller')
const { validarJWT } = require('../middlewares/validar-jsonwebtoken')
const router=Router()

router.get('/:busqueda',validarJWT,getTodo)
router.get('/colleccion/:tabla/:busqueda',validarJWT,getTodo)


module.exports=router

