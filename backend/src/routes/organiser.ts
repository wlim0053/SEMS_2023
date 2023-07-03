import express from "express";
import {
  createOrganiserController,
  deleteOrganiserController,
  updateOrganiserController,
  getOrganiserController,
  getOrganiserByIDController,
} from "../controllers/organiserController";
import { Organiser } from "../interfaces/organiser";
import { requestValidators } from "../middlewares/requestValidator";
import { verifyJwtHandler } from "../middlewares/jwtHandler";

export const organiserRouter = express.Router();
//TODO: change O to A
organiserRouter
  .route("/")
  .post(
    verifyJwtHandler(["O"]),
    requestValidators({ body: Organiser }),
    createOrganiserController
  )
  .get(verifyJwtHandler(["O"]), getOrganiserController);

organiserRouter
  .route("/:id")
  .get(verifyJwtHandler(["O"]), getOrganiserByIDController)
  .put(
    verifyJwtHandler(["O"]),
    requestValidators({ body: Organiser }),
    updateOrganiserController
  )
  .delete(verifyJwtHandler(["O"]), deleteOrganiserController);
