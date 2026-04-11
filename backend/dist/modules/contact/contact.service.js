"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const db_1 = require("../../config/db");
class ContactService {
    static async create(data) {
        return db_1.prisma.contactMessage.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
            },
        });
    }
    static async list(page = 1, limit = 20, search) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { message: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [messages, total] = await Promise.all([
            db_1.prisma.contactMessage.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            db_1.prisma.contactMessage.count({ where }),
        ]);
        return {
            messages,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
exports.ContactService = ContactService;
