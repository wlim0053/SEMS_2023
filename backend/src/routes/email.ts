import express from "express"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { createEmailReminderController } from "../controllers/emailController"

export const emailRouter = express.Router()

emailRouter
    .route("/:id/reminder")
    .post(
        verifyJwtHandler(["A", "O"]),
        createEmailReminderController
    )
