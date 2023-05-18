import express from "express"
import {
    createFeedbackController,
    updateFeedbackController,
    getFeedbackController,
    getFeedbackByIDController,
    deleteFeedbackController
} from "../controllers/feedbackController"
import { Feedback } from "../interfaces/feedback"
import { requestValidators } from "../middlewares/requestValidator"

export const feedbackRouter = express.Router()

feedbackRouter
    .route("/")
    .post(requestValidators({ body: Feedback }), createFeedbackController)
    .get(getFeedbackController)

feedbackRouter
    .route("/:id")
    .get(getFeedbackByIDController)
    .put(requestValidators({ body: Feedback }), updateFeedbackController)
    .delete(deleteFeedbackController)