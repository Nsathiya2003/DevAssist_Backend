import mongoose from "mongoose";

const MessageHistorySchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Types.ObjectId,
        ref:'Chat'
    },
    message: {
        type: mongoose.Schema.Types.Mixed
    },
    message_type:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:false
    }
    },
    {
      timestamps:true  
    }

);

export const MessageHistory = mongoose.model('Messages_history',MessageHistorySchema)