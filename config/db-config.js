import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const DBConfig = async () => {
    try{
        const res = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb database was connected')   
    }
    catch(error){
        console.log(error);
        process.exit(1); 
    }
}

