import express from "express"
import {
	registerUserController,
	updateUserController,
	getUserEventByIdController,
	loginUserController,
} from "../controllers/userController"
import { User, UserWithFireId } from "../interfaces/user"
import { requestValidators } from "../middlewares/requestValidator"

export const userRouter = express.Router()

userRouter.route("/login").post(loginUserController)

userRouter
	.route("/register")
	.post(requestValidators({ body: UserWithFireId }), registerUserController)

// endpoint to get all the user's participated events
userRouter.route("/:id/event").get(getUserEventByIdController)

userRouter
	.route("/:id")
	.put(requestValidators({ body: User }), updateUserController)
// .get(getUserByIdController)
// .delete(deleteUserController)
