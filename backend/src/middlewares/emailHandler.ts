import nodemailer from "nodemailer"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "../utils/constant"
import { readFile } from "fs"
import handlebars from 'handlebars';

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

    readFile('./src/utils/template/registration.html', 'utf8', (err, htmlTemplate) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      
        const template = handlebars.compile(htmlTemplate);
      
        const data = {
            name: 'John Doe',
            eventName: 'Tech Talk: Exploring the Future of Artificial Intelligence',
        };
      
        const mail = template(data);
      
        let message = {
            from: user,
            to: ["xlee0024@student.monash.edu", "wlim0052@student.monash.edu"],
            subject: "Thank you for your registration!",
            html: mail
            // ,
            // attachments: [{
            //     filename: "2023-Engaged_and_Integrated_Student_Experience_Platform.pdf",
            //     path: './src/2023-Engaged_and_Integrated_Student_Experience_Platform.pdf'
            // }]
        }
      
        transporter.sendMail(message).then(() => {
            return res.sendStatus(StatusCodes.OK);
        }).catch(() => {
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        });
    });
}

export const reminderEmail = async (req: Request, res: Response, next: NextFunction) => {

    let transporter = nodemailer.createTransport(trans_obj);

    readFile('./src/utils/template/reminder.html', 'utf8', (err, htmlTemplate) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      
        const template = handlebars.compile(htmlTemplate);
      
        const data = {
            name: 'John Doe',
            eventName: 'Tech Talk: Exploring the Future of Artificial Intelligence',
        };
      
        const mail = template(data);
      
        let message = {
            from: user,
            to: ["xlee0024@student.monash.edu", "wlim0052@student.monash.edu"],
            subject: "Reminder: SEMS - Important Information before joining the event",
            html: mail
        }
      
        transporter.sendMail(message).then(() => {
            return res.sendStatus(StatusCodes.OK);
        }).catch(() => {
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        });
      });
}

export const postEventEmail = async (req: Request, res: Response, next: NextFunction) => {

    let transporter = nodemailer.createTransport(trans_obj);

    // let mailGenerator = new Mailgen({
    //     theme: "default",
    //     product: {
    //         name: "SEMS",
    //         link: "https://www.monash.edu.my"
    //     }
    // })

    // let response = {
    //     body: {
    //         name: "mimiyazaki", //req.body.user_fname
    //         intro: [`We would like to express our sincerest thanks for your participation in [Event Name]. \
    //         Your presence made the event truly special, and we hope you had an enjoyable and enriching experience.`,

    //         `We highly value your feedback as it helps us improve our future events and provide \
    //         a better experience for all participants. \
    //         We kindly request a few minutes of your time to share your thoughts and insights about the event. \
    //         by clicking on the following link to access the feedback form: [Feedback Form Link]. \
    //         Your feedback will be invaluable in shaping our future initiatives.`
            
    //         ], 
    //         outro: "Once again, thank you for being a part of [Event Name]. \
    //         Your active participation and feedback play a vital role in our continuous efforts to \
    //         deliver exceptional events.",
    //     },
    // };
      
    // let mail = mailGenerator.generate(response);

    // let message = {
    //     from: user,
    //     to: ["ktan0087@student.monash.edu", "wlim0053@student.monash.edu"],
    //     subject: "Your Feedback Matters! Share Your Experience of [Event Name]",
    //     html: mail
    // }

    // transporter.sendMail(message).then(() => {
    //     return res.sendStatus(StatusCodes.OK)
    // }).catch(() => {
    //     return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    // });
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
