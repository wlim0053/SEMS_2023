import express from "express"
import {
	createStudentController,
	updateStudentController,
	getStudentByIdController,
	getStudentController,
	deleteStudentController,
} from "../controllers/studentController"

export const studentRouter = express.Router()

studentRouter.route("/").post(createStudentController).get(getStudentController)

studentRouter
	.route("/:id")
	.put(updateStudentController)
	.get(getStudentByIdController)
	.delete(deleteStudentController)
