import { Request, Response, NextFunction } from 'express';
import { createSchool, updateSchool, deleteSchool } from '../utils/seed';

export const createSchoolController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const created = await createSchool(data);
    res.send(created);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export const updateSchoolController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const school_uuid = req.params.id;
    const data = req.body;
    const updated = await updateSchool(school_uuid, data);
    res.send(updated);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

export const deleteSchoolController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const school_uuid = req.params.id;
    const deleted = await deleteSchool(school_uuid);
    res.send(deleted);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}