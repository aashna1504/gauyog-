"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContacts = exports.submitContact = void 0;
const helpers_1 = require("../../utils/helpers");
const contact_service_1 = require("./contact.service");
const email_service_1 = require("../../services/email.service");
const env_1 = require("../../config/env");
const submitContact = async (req, res, next) => {
    try {
        const contact = await contact_service_1.ContactService.create(req.body);
        if (env_1.config.adminEmailTo) {
            await email_service_1.emailService.sendMail({
                to: env_1.config.adminEmailTo,
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
        await email_service_1.emailService.sendMail({
            to: contact.email,
            subject: 'We received your message - Gauyog',
            html: `
        <p>Hi ${contact.name},</p>
        <p>Thanks for contacting Gauyog. Our team will reach out shortly.</p>
        <p><strong>Your message:</strong> ${contact.message}</p>
      `,
        });
        res.status(201).json((0, helpers_1.formatResponse)(true, 'Message submitted successfully', contact));
    }
    catch (error) {
        next(error);
    }
};
exports.submitContact = submitContact;
const getContacts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '20', 10);
        const search = req.query.search;
        const result = await contact_service_1.ContactService.list(page, limit, search);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Contacts retrieved successfully', result));
    }
    catch (error) {
        next(error);
    }
};
exports.getContacts = getContacts;
