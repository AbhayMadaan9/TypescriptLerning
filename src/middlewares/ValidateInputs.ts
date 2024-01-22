import {Response, Request, NextFunction } from "express";
import validator from 'validator';

export const validateInputs =async (req:Request, res: Response, next: NextFunction) => {
    if(validator.isEmail(req.body.email)){
    next()
    }
    else return res.send("Invalid email")
} 
