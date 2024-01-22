import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface UserType {
    _id: string,
    username?: string,
    email: string,
    password: string,
    imghash?: string
}

export interface CustomRequest extends Request {
    userid?: string
}


  