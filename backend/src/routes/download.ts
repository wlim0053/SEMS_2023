import express from "express"
import { downloadCertificateController } from "../controllers/downloadController"

export const downloadRouter = express.Router()

downloadRouter.get("/certificate", downloadCertificateController)
