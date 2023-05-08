import express from "express"
import {
	createDisciplineController,
	deleteDisciplineController,
	getDisciplineByIdController,
	getDisciplineController,
	updateDisciplineController,
} from "../controllers/disciplineController"

export const disciplineRouter = express.Router()

disciplineRouter
	.route("/")
	.post(createDisciplineController)
	.get(getDisciplineController)

disciplineRouter
	.route("/:id")
	.put(updateDisciplineController)
	.get(getDisciplineByIdController)
	.delete(deleteDisciplineController)
