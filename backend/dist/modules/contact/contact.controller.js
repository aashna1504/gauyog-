"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContacts = exports.submitContact = void 0;
const helpers_1 = require("../../utils/helpers");
const contact_service_1 = require("./contact.service");
const submitContact = async (req, res, next) => {
    try {
        // ContactService.create handles both DB save + all emails (admin + user auto-reply)
        const contact = await contact_service_1.ContactService.create(req.body);
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
