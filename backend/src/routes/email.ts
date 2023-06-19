import express from "express"
import {
	reminderEmail, postEventEmail
} from "../middlewares/emailHandler"

export const emailRouter = express.Router()

emailRouter.route("/reminder").post(reminderEmail)
emailRouter.route("/postEvent").post(postEventEmail)
