const {Router}=require('express')
const {validarJWT}= require('../middlewares/validar-jsonwebtoken')
const { fileUpload,getImagen } = require('../controllers/uploads.controller')
const expressFileUpload=require('express-fileupload')


const router=Router();
router.use(expressFileUpload())

router.put('/:tipo/:id',validarJWT,fileUpload)

router.get('/:tipo/:foto',getImagen)

module.exports=router;