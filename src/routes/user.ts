import express from 'express';
 import { getdetails } from '../controllers/user'
 import {isAuthorized} from '../middlewares/authorizeduser'
export const Userroute = express.Router()

Userroute.get('/details',isAuthorized, getdetails);


