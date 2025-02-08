'use stict'

import jwt from "jsonwebtoken"

//Generar un nuevo token
export const generateJwt = async(payload)=>{
    try {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '3h',
                algorithm: 'HS256'//método de encriptación
            }
        )
    } catch (err) {
        console.error(err)
        return err
    }
}