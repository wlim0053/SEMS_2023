import express from "express"
import {
	createUserController,
	updateUserController,
	getUserByIdController,
	getUserController,
	deleteUserController,
} from "../controllers/userController"
import { User, UserWithFireId } from "../interfaces/user"
import { requestValidators } from "../middlewares/requestValidator"

export const userRouter = express.Router()

userRouter
	.route("/")
	.post(requestValidators({ body: UserWithFireId }), createUserController)
	.get(getUserController)

userRouter
	.route("/:id")
	.put(requestValidators({ body: User }), updateUserController)
	.get(getUserByIdController)
	.delete(deleteUserController)
