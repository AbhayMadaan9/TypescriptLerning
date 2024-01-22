import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {Authroute} from './routes/auth'
import {Userroute} from './routes/user'
import DbConnection from './dbconnection'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'


//configurations
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

require('dotenv').config()
DbConnection()
const app = express();
app.use(express.json())
app.use(limiter)
app.use(cors({
    origin: ['*'],

}))
app.use(cookieParser())




//routes
app.use('/auth', Authroute);
app.use('/user', Userroute);


//listening port
app.listen(process.env.PORT, ()=>{console.log(`Server is running at port ${process.env.PORT}`)})