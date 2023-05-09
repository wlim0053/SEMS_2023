import express from "express"
import {
    createOrganiserController,
    deleteOrganiserController,
    updateOrganiserController,
    getOrganiserController,
    getOrganiserByIDController
} from "../controllers/organiserController"

export const organiserRouter = express.Router()

organiserRouter
    .route("/")
    .post(createOrganiserController)
    .get(getOrganiserController)

organiserRouter
	.route("/:id")
	.get(getOrganiserByIDController)
	.put(updateOrganiserController)
	.delete(deleteOrganiserController)