import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const generateAccessToken = async (payload) => {

    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES_IN || '2d'
    })

    return token;

}

export const isAuthenticated = (req,res,next) => {
    let isAuthToken = req.headers['authorization'];
    try{
        if(!isAuthToken){
            return res.status(409).json({
                message:'token is required'
            })
        };
        const token = isAuthToken.split("")[1];

        const decoded = jwt.verify(token,process.env.JWT_KEY_SECRET);
        req.user = decoded;
        next();

    }
    catch(error){

    }
}