import express from "express"
import jwt, { decode } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import {CustomRequest} from '../Interfaces/Interfaces'


async function renewtoken(req: CustomRequest, res: Response): Promise<boolean> {
  const refreshtoken: string = req.cookies.refreshtoken;
  try {
    if (!refreshtoken) return false;

    const decoded = jwt.verify(refreshtoken, process.env.JWT_SALT) as { userid: string };
    if (decoded) {
      const newAccessToken: string = jwt.sign({ userid: decoded.userid }, process.env.JWT_SALT, { expiresIn: '5m' }); 
      res.cookie('accessToken', newAccessToken, { maxAge: 3 * 24 * 60 * 60 * 1000 });
      return true;
    }

    return false;
  } catch (error) {
    console.error("Login again");
    return false;
  }
}
export const isAuthorized = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken: string = req.cookies.accessToken
    if (!accessToken) {
      // return res.status(403).send("Token not found");
      if(renewtoken(req, res))
      {
        next();
      }
      else return res.status(400).send("Login please");
    }

    
    

    
    jwt.verify(accessToken, process.env.JWT_SALT, (err, decoded: {userid: string}) => {
      if (err) {
        return res.status(400).send("Login again")
      }
      else {
        req.userid = decoded.userid;
      }
    });
    
    next();
  } catch (error) {
    return res.status(500).send("Error authenticating user: " + error.message);
  }
};
