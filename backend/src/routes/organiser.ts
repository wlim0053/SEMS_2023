import express from "express"
import {
    createOrganiserController,
    deleteOrganiserController,
    updateOrganiserController,
    getOrganisersController,
    getOrganiserByIDController
} from "../controllers/organiserController"

export const organiserRouter = express.Router()

organiserRouter
    .route("/")
    .post(createOrganiserController)
    .get(getOrganisersController)

organiserRouter
	.route("/:id")
	.get(getOrganiserByIDController)
	.put(updateOrganiserController)
	.delete(deleteOrganiserController)