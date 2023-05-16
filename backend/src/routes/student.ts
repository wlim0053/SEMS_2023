import express from "express"
import {
	createStudentController,
	updateStudentController,
	getStudentByIdController,
	getStudentController,
	deleteStudentController,
} from "../controllers/studentController"
import { Student, StudentWithFireId } from "../interfaces/student"
import { requestValidators } from "../middlewares/requestValidator"

export const studentRouter = express.Router()

studentRouter
	.route("/")
	.post(
		requestValidators({ body: StudentWithFireId }),
		createStudentController
	)
	.get(getStudentController)

studentRouter
	.route("/:id")
	.put(requestValidators({ body: Student }), updateStudentController)
	.get(getStudentByIdController)
	.delete(deleteStudentController)
