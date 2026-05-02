import express from 'express';
import { createChat } from '../controller/chat-controller.js';

export const chatRouter = express.Router();

chatRouter.post('/create',createChat)