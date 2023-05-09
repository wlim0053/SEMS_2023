import express from "express";
import {
  getSchoolController,
  getSchoolByIdController,
  updateSchoolController,
  deleteSchoolController,
} from "../controllers/schoolController";

export const schoolRouter = express.Router();

schoolRouter.route("/").get(getSchoolController);

schoolRouter
  .route("/:id")
  .get(getSchoolByIdController)
  .put(updateSchoolController)
  .delete(deleteSchoolController);
