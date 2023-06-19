import nodemailer from "nodemailer"
import { NextFunction, Request, Response } from "express"
import Mailgen from "mailgen"
import { StatusCodes } from "../utils/constant"
import handlebars from "handlebars"

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
                    event: "Tech Talk: Exploring the Future of Artificial Intelligence", // req.body.event_title
                    description: "Join us for an exciting Tech Talk session where we delve into the fascinating \
                    world of Artificial Intelligence (AI). Discover how AI is transforming industries, learn about \
                    the latest advancements, and explore the ethical implications of this rapidly evolving technology. \
                    Whether you're a technology enthusiast or simply curious about AI, this event is an opportunity to \
                    expand your knowledge and engage in insightful discussions with industry experts." // req.body.event_desc
                }],
            }, 
            outro: "Thank you and we look forward to seeing you soon!",
        },
    };
      
    let mail = mailGenerator.generate(response);

    let message = {
        from: user,
        to: ["eooi0006@student.monash.edu", "wlim0053@student.monash.edu"],
        subject: "Thank you for your registration!",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.sendStatus(StatusCodes.OK)
    }).catch(() => {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    });
}

export const reminderEmail = async (req: Request, res: Response, next: NextFunction) => {

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
            intro: [`We hope this email finds you well. \
            This is a friendly reminder about the upcoming event, ${user}, \
            that you have registered for. We are excited to have you join us!`,

            `To ensure you have all the latest information and instructions for the event, \
            we kindly request you to visit our SEMS platform at https://www.monash.edu.my. \
            This is where you\'ll find all the details you need, \
            including event details, attire recommendations, instructions, and any updates or changes.`
            
            ], 
            outro: "We appreciate your involvement! Mark your calendar for your event\
            as we eagerly await your presence!",
        },
    };
      
    let mail = mailGenerator.generate(response);

    let message = {
        from: user,
        to: ["miaakerlundmia@gmail.com", "xlee0024@student.monash.edu"],
        subject: "Reminder: SEMS - Important Information before joining the event",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.sendStatus(StatusCodes.OK)
    }).catch(() => {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    });
}

export const postEventEmail = async (req: Request, res: Response, next: NextFunction) => {

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
            intro: [`We would like to express our sincerest thanks for your participation in [Event Name]. \
            Your presence made the event truly special, and we hope you had an enjoyable and enriching experience.`,

            `We highly value your feedback as it helps us improve our future events and provide \
            a better experience for all participants. \
            We kindly request a few minutes of your time to share your thoughts and insights about the event. \
            by clicking on the following link to access the feedback form: [Feedback Form Link]. \
            Your feedback will be invaluable in shaping our future initiatives.`
            
            ], 
            outro: "Once again, thank you for being a part of [Event Name]. \
            Your active participation and feedback play a vital role in our continuous efforts to \
            deliver exceptional events.",
        },
    };
      
    let mail = mailGenerator.generate(response);

    let message = {
        from: user,
        to: ["ktan0087@student.monash.edu", "wlim0053@student.monash.edu"],
        subject: "Your Feedback Matters! Share Your Experience of [Event Name]",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.sendStatus(StatusCodes.OK)
    }).catch(() => {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    });
}

export const approveEventEmail = async (req: Request, res: Response, next: NextFunction) => {

    let transporter = nodemailer.createTransport(trans_obj);

    const name = 'mimiyazaki'
    const eventName = 'Tech Talk: Exploring the Future of Artificial Intelligence'
    let mail = `
        <p>Dear ${name},</p>
        <p>We are pleased to inform you that your event, ${eventName}, has been approved and is scheduled to take place as planned.</p>
        <p>Congratulations on receiving the approval!</p>
        <p>We look forward to witnessing the success of the event and the positive impact it will have on the participants.</p>
        <p>Thank you for your contribution to our event community.</p>
        <p>Sincerly,</p>
        <p>SEMS</p>`;

    let message = {
        from: user,
        to: ["ktan0087@student.monash.edu", "wlim0053@student.monash.edu", "xlee0024@student.monash.edu"],
        subject: "SEMS - Event Approval Confirmation",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.sendStatus(StatusCodes.OK)
    }).catch(() => {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    });
}
