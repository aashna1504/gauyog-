"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryService = void 0;
const db_1 = require("../../config/db");
class DeliveryService {
    static async getDeliveryDetails(userId) {
        return db_1.prisma.deliveryDetails.findUnique({ where: { userId } });
    }
    static async upsertDeliveryDetails(userId, data) {
        return db_1.prisma.deliveryDetails.upsert({
            where: { userId },
            update: data,
            create: { userId, ...data },
        });
    }
}
exports.DeliveryService = DeliveryService;
