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
        return res.status(400).json({
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
         return res.status(500).json({
            status: 'failure',
            message:'Failed to login user',
            error: error.message,
            data:[]
        })
    }
}

// export const filter = async (req,res) => {
//     const { page =1, limit=10, username, email } = req.body;

//     let filter = {};

//     if(username){
//         filter.username = { $regex: username,$options:"i"}
//     }
//     if(email){
//         filter.email = { $regex : email, $options:"i"}
//     }

//     const skip = (page-1) * limit;

//     const users = await User.find(filter).skip(skip).limit(Number(limit));

//     const total = await users.countDocuments(filter);

//     return res.status(201).json({
//         status:'true',
//         message:'Filter is returned retrived successfully',
//         data:users
//     })



// }


const filter = async (req,res)=> {
    const { page=1, limit=10,username} = req.body;

    let filter = {};

    if(username){
        filter.username = { $regex: username, $options:'i'}
    }

    const skip = (page-1)*limit;

    const users = await User.find(filter).populate("clientId");;

    const countDocuments = await users.countDocuments(users);

    return users;
}