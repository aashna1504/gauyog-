import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../../utils/helpers';
import { ContactService } from './contact.service';
import { emailService } from '../../services/email.service';

export const submitContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await ContactService.create(req.body);

    // Auto-reply to the enquirer
    emailService.sendMail({
      to: contact.email,
      subject: 'We received your enquiry – Gauyog Kendr',
      html: `
        <p>Hi ${contact.name},</p>
        <p>Thank you for reaching out to <strong>Gauyog Kendr</strong>. We've received your enquiry and our team will get back to you within 2 business hours.</p>
        <p style="color:#6b7280;font-size:13px;">${contact.message}</p>
        <p>Warm regards,<br/>Team Gauyog Kendr</p>
      `,
    }).catch(() => {/* non-fatal */});

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
