import express from "express"
import {
	reminderEmail, postEventEmail, approveEventEmail
} from "../middlewares/emailHandler"

export const emailRouter = express.Router()

emailRouter.route("/reminder").post(reminderEmail)
emailRouter.route("/postEvent").post(postEventEmail)
emailRouter.route("/approveEvent").post(approveEventEmail)
