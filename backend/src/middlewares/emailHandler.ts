import nodemailer from "nodemailer"
import { NextFunction, Request, Response } from "express"
import Mailgen from "mailgen"
import { StatusCodes } from "../utils/constant"

const user = process.env.email_user;
const pass = process.env.email_password;
const trans_obj = {
    service: "gmail",
    auth: {
        user: user, 
        pass: pass,
    }
}

export const registrationEmail = async (req: Request, res: Response, next: NextFunction) => {

    let transporter = nodemailer.createTransport(trans_obj);

    let mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "SEMS",
            link: "https://www.monash.edu.my"
        }
    })

    let response = {
        body: {
            name: "mimiyazaki", //req.body.user_fname
            intro: "You have successfully signed up for an event!",
            table: {
                data: [ {
                    event: "event title", // req.body.event_title
                    description: "event description" // req.body.event_desc
                }],
            }, 
            outro: "Thank you and we look forward to seeing you soon!",
        },
    };
      
    let mail = mailGenerator.generate(response);

    let message = {
        from: user,
        to: "miaakerlundmia@gmail.com",
        subject: "Thank you for your registration!",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.sendStatus(StatusCodes.OK)
    }).catch(() => {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    });
}

