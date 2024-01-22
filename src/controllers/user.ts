import express from "express";
import {User} from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CustomRequest, UserType } from "Interfaces/Interfaces";

export const getdetails = async(req: CustomRequest, res: express.Response)=>{
try {
    const userid: string = req.userid;
const userdetails: UserType[] = await User.find({_id: userid}).select('-password')
if(!userdetails) return res.status(401).send("No User Found");
else return res.status(200).send(userdetails[0]);

} catch (error) {
    return res.status(500).send("Error fetching user details" + error.message);
}
}




