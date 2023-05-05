
import express, { Router, Request, Response, NextFunction } from 'express';
import { createSchoolController, updateSchoolController, deleteSchoolController } from '../controllers/schoolController';

const router: Router = express.Router();

router.post('/school', createSchoolController);
router.put('/school/:id', updateSchoolController);
router.delete('/school/:id', deleteSchoolController);

export const routes = router;


