import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { UserWithFireId } from "../interfaces/user"
dotenv.config({
	path: "development" === process.env.NODE_ENV ? ".env.dev" : ".env.prod",
})

export const generateJwtHandler = (user: UserWithFireId) => {
    
    const payload = {user_fire_id: user.user_fire_id, user_access_lvl: user.user_access_lvl, user_email: user.user_email}

    const token = jwt.sign(payload, process.env.access_token_secret!, {expiresIn: "1h"})

    return token
}



export const verifyJwtHandler = (access_level: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("Unauthorized")
        }
        try {
            const user = jwt.verify(token, process.env.access_token_secret!)
            console.log(typeof user)
            if(typeof user === "object" && access_level.includes(user.user_access_lvl)){
                req.body.user = user
                next()
            }else{
                res.status(403)
                throw new Error("Not permitted")
            }

        } catch (error) {
            next(error)
        }
    }
}