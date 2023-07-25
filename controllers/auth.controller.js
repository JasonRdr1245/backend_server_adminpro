const { response } = require('express');
const Usuario = require('../models/usuario');
const encryptation = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

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

module.exports = {
    login
};