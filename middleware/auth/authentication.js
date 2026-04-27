import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const generateAccessToken = async (payload) => {

    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES_IN || '2d'
    })

    return token;

}