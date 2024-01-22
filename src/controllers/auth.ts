import express from "express";
import {User} from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import {UserType} from '../Interfaces/Interfaces'


export async function register(req: Request , res: Response) {
  try {
    const { email, password, username, imghash } = req.body;
    if (!email || !password || !username) {
      return res.status(400).send("Empty field");
    }

    const existingUser: UserType[] = await User.find({ email: email });

    if (existingUser.length > 0) {
      return res.status(400).send("User already exists");
    }

    let encryptedpassword: string; 
     await bcrypt.hash(password, 6).then(hashpass=>{
      encryptedpassword = hashpass;
    }); 

    const user = new User({
      username,
      email,
      imghash,
      password: encryptedpassword, 
    });

    await user.save();
    return res.status(200).send("User registered successfully");
  } catch (error) {
    return res.status(500).send("Error registering user" + error.message);
  }
}


export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Empty field");
    }

    const existingUser: UserType[] = await User.find({ email: email });
    if (existingUser.length === 0) {
      return res.status(400).send("User does not exists");
    }
    let hashpassword: string =  existingUser[0].password;
    bcrypt.compare(password, hashpassword, function (err, result: boolean) {
      if (err) {
        return res.status(500).send("Error generating encrypted password");
      }
      if (!result) {
        return res.status(400).send("Invalid password");
      }
    });
    const { _id } = existingUser[0];
    const accesstoken: string = jwt.sign({ userid: _id }, process.env.JWT_SALT, { expiresIn: '5m' });
    const refreshtoken: string = jwt.sign({ userid: _id }, process.env.JWT_SALT, { expiresIn: '24hr' });
    res.cookie("accessToken", accesstoken, {maxAge: 3*24*60*60*1000});
    res.cookie("refreshtoken", refreshtoken, {maxAge: 3*24*60*60*1000});
    return res.status(200).json({"login": true, "message": "Login successfull"});
  } catch (error) {
    return res.status(500).send("Error sigining in the user: " + error.message);
  }

}



