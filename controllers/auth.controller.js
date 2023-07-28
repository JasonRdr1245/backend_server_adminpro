const { response } = require('express');
const Usuario = require('../models/usuario');
const encryptation = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google_verify');

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

const errorPasswordOrEmailHandler = (res) => {
    return res.status(404).json({
        ok: false,
        msg: 'contraseña o correo no válidos'
    });
}

const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({
        ok: false,
        msg: 'hable con el administrador'
    });
};

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        await delay();
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return errorPasswordOrEmailHandler(res);
        }




        if (!usuarioDB.password) {
            return errorPasswordOrEmailHandler(res);
        }

        const validPassword = encryptation.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return errorPasswordOrEmailHandler(res);
        }

        const token =await generarJWT(usuarioDB.id);

        

        return res.json({
            ok: true,
            token
        });
    } catch (error) {
        return errorHandler(res, error);
    }
};

const googleSingIn=async(req,res=response)=>{
    try{
        const {email,given_name,family_name,picture}=await googleVerify(req.body.token);

        const name=`${given_name} ${family_name}`

        const usuarioDB=await Usuario.findOne({email})

        let usuario;

        if(!usuarioDB){
            usuario=new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario=usuarioDB
            //cancelar forma de inicio a logear con google de forma normal
            //usuario.passowrd='@@'
            usuario.google=true
        }


        await usuario.save()

        //generar json web token

        const token=await generarJWT(usuario.id)


        res.json({
            ok:true,
            email,name,picture,
            token
        })
    }catch(error){
        res.status(400).json({
            ok:false,
            msg:'Token de google no es correcto',
            err: error
        })
    }
    
}



module.exports = {
    login,
    googleSingIn
};