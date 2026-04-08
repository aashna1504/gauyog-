import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../../utils/helpers';
import { ContactService } from './contact.service';
import { emailService } from '../../services/email.service';
import { config } from '../../config/env';

export const submitContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await ContactService.create(req.body);

    if (config.adminEmailTo) {
      await emailService.sendMail({
        to: config.adminEmailTo,
        subject: `New contact form submission from ${contact.name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || '-'}</p>
          <p><strong>Message:</strong><br/>${contact.message}</p>
        `,
      });
    }

    await emailService.sendMail({
      to: contact.email,
      subject: 'We received your message - Gauyog',
      html: `
        <p>Hi ${contact.name},</p>
        <p>Thanks for contacting Gauyog. Our team will reach out shortly.</p>
        <p><strong>Your message:</strong> ${contact.message}</p>
      `,
    });

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
