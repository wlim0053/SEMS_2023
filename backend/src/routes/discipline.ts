import express from "express"
import {
	createDisciplineController,
	deleteDisciplineController,
	getDisciplineByIdController,
	getDisciplineController,
	updateDisciplineController,
} from "../controllers/disciplineController"
import { Discipline } from "../interfaces/discipline"
import { requestValidators } from "../middlewares/requestValidator"

export const disciplineRouter = express.Router()

disciplineRouter
	.route("/")
	.post(requestValidators({ body: Discipline }), createDisciplineController)
	.get(getDisciplineController)

disciplineRouter
	.route("/:id")
	.put(requestValidators({ body: Discipline }), updateDisciplineController)
	.get(getDisciplineByIdController)
	.delete(deleteDisciplineController)
