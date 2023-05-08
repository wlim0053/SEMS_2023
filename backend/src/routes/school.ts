import express from "express"
import {
	getSchools,
	getSchoolById,
	updateSchoolController,
	deleteSchoolController,
} from "../controllers/schoolController"

export const schoolRouter = express.Router()

schoolRouter.route("/").get(getSchools)

schoolRouter
	.route("/:id")
	.get(getSchoolById)
	.put(updateSchoolController)
	.delete(deleteSchoolController)
