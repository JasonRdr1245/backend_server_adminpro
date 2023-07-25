const jwt=require('jsonwebtoken')


//SYNCRONIC
const generarJWT=(uid)=>{

    return new Promise((resolve,reject)=>{
        const payload={
            uid,
        };

        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'24h'
        },(error,token)=>{
            if(error){
                console.log(error);
                reject(error)
            }else{
                resolve(token);
            }
        })

    });

}

module.exports={
    generarJWT,
}