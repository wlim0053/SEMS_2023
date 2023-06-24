import express from "express"
import {
	registerUserController,
	updateUserController,
	loginUserController,
} from "../controllers/userController"
import { User, UserWithFireId } from "../interfaces/user"
import { requestValidators } from "../middlewares/requestValidator"

export const userRouter = express.Router()

userRouter.route("/login").post(loginUserController)

userRouter
	.route("/register")
	.post(requestValidators({ body: UserWithFireId }), registerUserController)

userRouter
	.route("/:id")
	.put(requestValidators({ body: User }), updateUserController)
// .get(getUserByIdController)
