import express from "express"
import {
	reminderEmail
} from "../middlewares/emailHandler"

export const emailRouter = express.Router()

emailRouter.route("/reminder").post(reminderEmail)
