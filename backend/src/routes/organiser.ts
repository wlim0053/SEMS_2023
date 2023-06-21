import express from "express"
import {
	createOrganiserController,
	deleteOrganiserController,
	updateOrganiserController,
	getOrganiserController,
	getOrganiserByIDController,
} from "../controllers/organiserController"
import { Organiser } from "../interfaces/organiser"
import { requestValidators } from "../middlewares/requestValidator"
import { verifyJwtHandler } from "../middlewares/jwtHandler"

export const organiserRouter = express.Router()

organiserRouter
	.route("/")
	.post(requestValidators({ body: Organiser }), createOrganiserController)
	.get(verifyJwtHandler,getOrganiserController)

organiserRouter
	.route("/:id")
	.get(getOrganiserByIDController)
	.put(requestValidators({ body: Organiser }), updateOrganiserController)
	.delete(deleteOrganiserController)
