import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../../utils/helpers';
import { ContactService } from './contact.service';

export const submitContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ContactService.create handles both DB save + all emails (admin + user auto-reply)
    const contact = await ContactService.create(req.body);
    res.status(201).json(formatResponse(true, 'Message submitted successfully', contact));
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);
    const search = req.query.search as string | undefined;

    const result = await ContactService.list(page, limit, search);
    res.status(200).json(formatResponse(true, 'Contacts retrieved successfully', result));
  } catch (error) {
    next(error);
  }
};
