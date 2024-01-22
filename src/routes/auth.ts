import express from 'express';
 import { login, register} from '../controllers/auth'
 
import { validateInputs } from '../middlewares/ValidateInputs';

export const  Authroute = express.Router()

Authroute.post('/register',  validateInputs, register);
Authroute.post('/login', login);



 