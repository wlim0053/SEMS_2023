import express, { Request, Response, NextFunction } from "express"
import {
	getSchools,
	getSchoolById,
	createSchoolController,
	updateSchoolController,
	deleteSchoolController,
} from "../controllers/schoolController"

export const schoolRouter = express.Router()

schoolRouter.route("/").get(getSchools).post(createSchoolController)

schoolRouter
	.route("/:id")
	.get(getSchoolById)
	.put(updateSchoolController)
	.delete(deleteSchoolController)
