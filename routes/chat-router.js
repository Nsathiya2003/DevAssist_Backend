import express from 'express';
import { createChat, getChatMessages,getLatestChats } from '../controller/chat-controller.js';
import { isAuthenticated } from '../middleware/auth/authentication.js';

export const chatRouter = express.Router();

chatRouter.post('/create', isAuthenticated, createChat)

chatRouter.get('/get/:id',isAuthenticated,getChatMessages)

chatRouter.get('/latest-chats',isAuthenticated,getLatestChats)