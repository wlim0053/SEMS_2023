import express from "express"
import { createEmailReminderController } from "../controllers/emailController"

export const emailRouter = express.Router()

emailRouter.route("/:id").post(createEmailReminderController)
// emailRouter.route("/approveEvent").post(approveEventEmail)
