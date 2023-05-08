import express from "express"
import {
	getStudentByID,
	getStudents,
	postStudent,
} from "../controllers/studentController"

export const studentRouter = express.Router()

studentRouter.route("/").get(getStudents).post(postStudent)

studentRouter.route("/:id").get(getStudentByID)
