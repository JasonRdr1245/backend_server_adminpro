const {Router}=require('express')
const { check }=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const {validarJWT}= require('../middlewares/validar-jsonwebtoken')
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales.controller')
const router=Router()

router.get('/',getHospitales)

router.post(
    '/',
    [
        validarJWT,
        check('nombre','El nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
)
router.put(
    '/:id',
    [
    ],
    actualizarHospital
)

router.delete('/id',borrarHospital)


module.exports=router;