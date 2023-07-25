const {Router}=require('express')
const { check }=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const {getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario}=require('../controllers/usuarios.controller')
const {validarJWT}= require('../middlewares/validar-jsonwebtoken')



const router=Router();


router.get('/',validarJWT,getUsuarios)

router.post(
    '/',
    [

        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('password','la contraseña es obligatoria').not().isEmpty(),
        check('email','el formato es email').isEmail(),
        validarCampos
    ],
    crearUsuario
)
router.put(
    '/:id',
    [
        validarJWT,
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('password','la contraseña es obligatoria').not().isEmpty(),
        check('email','el formato es email').isEmail(),
        check('role','el role es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,actualizarUsuario
)

router.delete('/id',validarJWT,borrarUsuario)


module.exports=router;