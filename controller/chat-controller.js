import mongoose from "mongoose";
import { ChatModel } from "../models/chat-model.js";
import { aiIntegrate } from "../services/ai-integration.js";
import { buildPrompt } from "../services/prompt-builder.js";
import { MessageHistory } from "../models/chat-message-model.js";

export const createChat = async (req, res) => {
    const { prompt, chatId } = req.body;
    const userId = req.user._id;

    try {
        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                status: false,
                message: "Prompt is required"
            });
        }

        const { type, prompt: builtPrompt } = await buildPrompt(prompt);
        console.log('Prmopts level',prompt,type)

        let chat;
        let finalChatId;

        if (chatId && mongoose.Types.ObjectId.isValid(chatId)) {
            chat = await ChatModel.findOne({ _id: chatId, userId });

        if (!chat) {
                return res.status(404).json({
                    status: false,
                    message: "Chat not found"
                });
            }

            finalChatId = chat._id;
        }
        else {
            chat = await ChatModel.create({
                title: prompt.slice(0, 30),
                userId
            });

            finalChatId = chat._id;
        }
        console.log('prompt',prompt)
        await MessageHistory.create({
            chatId: finalChatId,
            message: prompt,
            message_type: 'USER_QUERY'
        });

        const data = await aiIntegrate(builtPrompt);
        console.log('data',data)

        await MessageHistory.create({
            chatId: finalChatId,
            message: data,
            message_type: 'LLM_RESPONSE',
            type: type
        });

        return res.status(201).json({
            status: "success",
            message: "Output retrieved successfully",
            type,
            chatId: finalChatId,
            data
        });

    } catch (error) {
        return res.status(500).json({
            status: "failure",
            message: "Failed to generate output",
            error: error.message
        });
    }
};

export const getChatMessages = async (req,res) => {
    const { id } = req.params;
    console.log('chatId',id)

    try{
        const messages = await MessageHistory.find({
            chatId : id
        });
        if(messages.length ===0 ){
            return res.status(201).json({
                status:'success',
                message:'No messages found',
                data:[]
            })
        }
        return res.status(201).json({
            status:'success',
            message:'Chat message retrived successfully',
            data:messages
        })
    }
    catch(error){
    return res.status(500).json({
            status:'failure',
            message:'Failed fetch messages',
            data:messages
        })
    }
}

export const getLatestChats = async (req, res) => {
    try {
        const userId = req.user._id;

        const latestChats = await ChatModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(7);

        const chatsWithMessages = await Promise.all(
            latestChats.map(async (chat) => {
                const messages = await MessageHistory
                    .find({ chatId: chat._id })
                    .sort({ createdAt: 1 }); // oldest → latest

                return {
                    _id: chat._id,
                    title: chat.title,   // assuming title exists
                    createdAt: chat.createdAt,
                    messages: messages
                };
            })
        );

        return res.status(200).json({
            data: chatsWithMessages
        });

    } catch (error) {
        return res.status(500).json({
            status: "failure",
            message: "Failed to retrieve chats",
            data: []
        });
    }
};