const {Router}=require('express')
const {check}=require('express-validator')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.controller')
const { validarJWT } = require('../middlewares/validar-jsonwebtoken')
const { validarCampos } = require('../middlewares/validar-campos')


const router=Router()

router.get('/',getMedicos)

router.post(
    '/',
    [
        validarJWT,
        check('nombre','nombre medico es obligatorio').not().isEmpty(),
        check('nombre','el hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
)
router.put(
    '/:id',
    [
    ],
    actualizarMedico
)

router.delete('/id',borrarMedico)



module.exports=router