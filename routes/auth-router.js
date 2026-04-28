import express from 'express';
import { verifyToken } from '../controller/auth-controller.js';

export const authRouter = express.Router();

authRouter.post('/verify-google',verifyToken)