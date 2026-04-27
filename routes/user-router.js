import express from 'express';
import { createUser,login } from '../controller/user-controller.js';

export const userRouter = express.Router();

userRouter.post('/create',createUser);

userRouter.post('/login',login)