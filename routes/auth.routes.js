// path: /api/login



const {Router}=require('express')
const {check}=require('express-validator')
//controller
const {login}=require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos')

const router=Router()


router.post(
    '/',
    [
        check('email','el email es obligatorio').isEmail(),
        check('password','password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)




module.exports=router