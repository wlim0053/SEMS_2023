import express from "express"
import {
	getSchoolController,
	getSchoolByIdController,
	updateSchoolController,
	deleteSchoolController,
} from "../controllers/schoolController"
import { ParamsWithId } from "../interfaces/paramsWithId"
import { School } from "../interfaces/school"
import { requestValidators } from "../middlewares/requestValidator"

export const schoolRouter = express.Router()

schoolRouter.route("/").get(getSchoolController)

schoolRouter
	.route("/:id")
	.get(getSchoolByIdController)
	.put(requestValidators({ body: School }), updateSchoolController)
	.delete(deleteSchoolController)
