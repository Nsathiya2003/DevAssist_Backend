import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = async (payload) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES_IN || '2d'
    })
    return token;
}

export const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('authHeader',authHeader)
        // 1. Check header exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }
        // 2. Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        // 3. Extract token
        const token = authHeader.split(" ")[1];

        // 4. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // 5. Attach user
        req.user = decoded.user || decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.Please login again",
            error: error.message
        });
    }
};