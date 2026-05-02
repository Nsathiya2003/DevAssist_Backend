import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user-router.js';
import { DBConfig } from './config/db-config.js';
import CORS from 'cors';
import { authRouter } from './routes/auth-router.js';
import { chatRouter } from './routes/chat-router.js';

dotenv.config();
DBConfig();

const app = express();

app.use(express.json());

app.use(CORS());

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/chat',chatRouter)

let port = process.env.PORT;

app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`)
})