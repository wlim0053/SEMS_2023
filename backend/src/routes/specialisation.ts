import express from "express"
import {
	createSpecialisationController,
	// deleteSpecialisationController,
	getSpecialisationByIdController,
	getSpecialisationController,
	// updateSpecialisationController,
} from "../controllers/specialisationController"
import { Specialisation } from "../interfaces/specialisation"
import { requestValidators } from "../middlewares/requestValidator"

export const specialisationRouter = express.Router()

specialisationRouter
	.route("/")
	.post(
		requestValidators({ body: Specialisation }),
		createSpecialisationController
	)
	.get(getSpecialisationController)

specialisationRouter
	.route("/:id")
	// .put(
	// 	requestValidators({ body: Specialisation }),
	// 	updateSpecialisationController
	// )
	.get(getSpecialisationByIdController)
// .delete(deleteSpecialisationController)
