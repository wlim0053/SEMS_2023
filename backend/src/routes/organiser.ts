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
import { verifyJwtHandler } from "../middlewares/jwtHandler"

export const organiserRouter = express.Router()

organiserRouter
	.route("/")
	.post(
		verifyJwtHandler(["A"]),
		requestValidators({ body: Organiser }),
		createOrganiserController
	)
	.get(verifyJwtHandler(["A"]), getOrganiserController)

organiserRouter
	.route("/:id")
	.get(verifyJwtHandler(["A"]), getOrganiserByIDController)
	.put(
		verifyJwtHandler(["A"]),
		requestValidators({ body: Organiser }),
		updateOrganiserController
	)
	.delete(verifyJwtHandler(["A"]), deleteOrganiserController)
