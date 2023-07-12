import express from "express"
import {
	registerUserController,
	updateUserController,
	loginUserController,
} from "../controllers/userController"
import { User, UserLogin, UserWithFireId } from "../interfaces/user"
import { requestValidators } from "../middlewares/requestValidator"
import { checkLoginHandler, verifyJwtHandler } from "../middlewares/jwtHandler"

export const userRouter = express.Router()

userRouter
	.route("/login")
	.post(requestValidators({ body: UserLogin }), loginUserController)

userRouter
	.route("/register")
	.post(requestValidators({ body: UserWithFireId }), registerUserController)

userRouter
	.route("/auth")
	.get(checkLoginHandler())

userRouter
	.route("/:id")
	.put(requestValidators({ body: User }), updateUserController)
// .get(getUserByIdController)
