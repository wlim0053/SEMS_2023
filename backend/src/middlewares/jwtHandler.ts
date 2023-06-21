import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
dotenv.config({
	path: "development" === process.env.NODE_ENV ? ".env.dev" : ".env.prod",
})

export const generateJwtHandler = (user_fire_id: string) => {
    
    const payload = {user_fire_id: user_fire_id}

    const token = jwt.sign(payload, process.env.access_token_secret!)

    return token
}

export const verifyJwtHandler = (req:Request, res: Response, next: NextFunction ) => {
    const token = req.cookies.token
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.access_token_secret!, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        
        console.log(user.user_fire_id);
        // req.user = user
        next()
    }
    )

}