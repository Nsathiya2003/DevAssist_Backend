import { generateAccessToken } from "../middleware/auth/authentication.js";
import { User } from "../models/user-model.js"

export const createUser = async (req,res) => {
    const { username, email} = req.body;

    try{
        const isExisting = await User.findOne({
            email : email
        });
        if(isExisting){
            return res.status(409).json({
                status:'failure',
                message:'This email already registered our account',
                data:[]
            });
        }

        const data = await User.create({
            username: username,
            email: email
        });

        return res.status(201).json({
            status: 'success',
            message:'user created successfully',
            data:data
        })
    }
    catch(error){
        return res.status(201).json({
            status: 'failure',
            message:'Failed to create user',
            error: error.message,
            data:[]
        })
    }
}


export const login = async (req,res) => {
    const { email } = req.body;
    try{
        const isExisting = await User.findOne({
            email : email
        });

        if(!isExisting){
            return res.status(409).json({
                status:'failure',
                message:'Email not found.Please provide valid email',
                data:[]
            });
        };

        let payload ={
            user : {
                _id: isExisting?._id,
                email: isExisting?.email
            }
        }
        const token = await generateAccessToken(payload);

        return res.status(201).json({
            status:'success',
            message:'User Logged in successfully',
            data:{
                accessToken : token
            }
        })

    }
    catch(error){
         return res.status(201).json({
            status: 'failure',
            message:'Failed to login user',
            error: error.message,
            data:[]
        })
    }
}