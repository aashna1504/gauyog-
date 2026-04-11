"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../../config/db");
const helpers_1 = require("../../utils/helpers");
class UserService {
    static async getAllUsers(page = 1, limit = 20, search) {
        const skip = (page - 1) * limit;
        const whereClause = search
            ? {
                OR: [
                    { email: { contains: search, mode: 'insensitive' } },
                    { name: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [users, total] = await Promise.all([
            db_1.prisma.user.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    deliveryDetails: true,
                },
            }),
            db_1.prisma.user.count({ where: whereClause }),
        ]);
        return {
            users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    static async getUserById(id) {
        const user = await db_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deliveryDetails: true,
                cart: {
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                },
            },
        });
        if (!user)
            throw new helpers_1.AppError('User not found', 404);
        return user;
    }
    static async updateUser(id, data) {
        const user = await db_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new helpers_1.AppError('User not found', 404);
        if (data.email && data.email !== user.email) {
            const existing = await db_1.prisma.user.findUnique({ where: { email: data.email } });
            if (existing)
                throw new helpers_1.AppError('Email already in use by another account', 409);
        }
        return db_1.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    static async deleteUser(id) {
        const user = await db_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new helpers_1.AppError('User not found', 404);
        return db_1.prisma.user.delete({ where: { id } });
    }
    static async getUserStats() {
        const [total, admins, users] = await Promise.all([
            db_1.prisma.user.count(),
            db_1.prisma.user.count({ where: { role: 'ADMIN' } }),
            db_1.prisma.user.count({ where: { role: 'USER' } }),
        ]);
        return { total, admins, users };
    }
}
exports.UserService = UserService;
