import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    },
    {
      timestamps:true  
    }

)

export const ChatModel = mongoose.model('Chat',ChatSchema)