import express from "express"
import {
	createUserController,
	updateUserController,
	getUserByIdController,
	getUserController,
	deleteUserController,
	getUserEventByIdController,
} from "../controllers/userController"
import { User, UserWithFireId } from "../interfaces/user"
import { requestValidators } from "../middlewares/requestValidator"

export const userRouter = express.Router()

userRouter
	.route("/")
	.post(requestValidators({ body: UserWithFireId }), createUserController) // TODO: prob need to shift this createUserController to register endpoint
	.get(getUserController)

// endpoint to get all the user's participated events
userRouter.route("/:id/event").get(getUserEventByIdController)

userRouter
	.route("/:id")
	.put(requestValidators({ body: User }), updateUserController)
	.get(getUserByIdController)
	.delete(deleteUserController)