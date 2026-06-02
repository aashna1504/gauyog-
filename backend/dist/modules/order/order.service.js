"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const db_1 = require("../../config/db");
const helpers_1 = require("../../utils/helpers");
class OrderService {
    static async createOrder(userId, data) {
        // Get the user's cart with items
        const cart = await db_1.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });
        if (!cart || cart.items.length === 0) {
            throw new helpers_1.AppError('Your cart is empty', 400);
        }
        // Calculate subtotal
        const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const shipping = 0;
        const tax = 0;
        const total = subtotal + shipping + tax;
        // Create order with items in a transaction
        const order = await db_1.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    paymentMethod: data.paymentMethod,
                    subtotal,
                    shipping,
                    tax,
                    total,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    building: data.building,
                    status: 'CONFIRMED',
                    items: {
                        create: cart.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price,
                            name: item.product.name,
                        })),
                    },
                },
                include: { items: true },
            });
            // Clear the cart
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            return newOrder;
        });
        return order;
    }
    static async getUserOrders(userId) {
        return db_1.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { product: { select: { imageUrl: true, name: true } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    static async getOrderById(orderId, userId) {
        const order = await db_1.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: { product: { select: { imageUrl: true, name: true } } },
                },
            },
        });
        if (!order)
            throw new helpers_1.AppError('Order not found', 404);
        if (order.userId !== userId)
            throw new helpers_1.AppError('Not authorized', 403);
        return order;
    }
    // Admin: get all orders
    static async getAllOrders(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [orders, total] = await Promise.all([
            db_1.prisma.order.findMany({
                skip,
                take: limit,
                include: {
                    user: { select: { email: true, name: true } },
                    items: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            db_1.prisma.order.count(),
        ]);
        return { orders, total, page, limit };
    }
    // Admin: update order status
    static async updateOrderStatus(orderId, status) {
        const order = await db_1.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new helpers_1.AppError('Order not found', 404);
        return db_1.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
    }
    // Admin: set or update tracking ID for an order
    static async updateTrackingId(orderId, trackingId) {
        const order = await db_1.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new helpers_1.AppError('Order not found', 404);
        return db_1.prisma.order.update({
            where: { id: orderId },
            data: { trackingId: trackingId.trim() || null },
        });
    }
    // Admin: get stats + stock levels + monthly revenue + recent products
    static async getStats() {
        const [productCount, userCount, orderCount, products, recentProducts, orders] = await Promise.all([
            db_1.prisma.product.count(),
            db_1.prisma.user.count({ where: { role: 'USER' } }),
            db_1.prisma.order.count(),
            db_1.prisma.product.findMany({
                select: { id: true, name: true, price: true, stock: true, inStock: true, imageUrl: true, createdAt: true },
                orderBy: { createdAt: 'desc' },
            }),
            db_1.prisma.product.findMany({
                select: { id: true, name: true, price: true, stock: true, inStock: true, imageUrl: true, createdAt: true },
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
            db_1.prisma.order.findMany({
                select: { total: true, createdAt: true, status: true },
                where: { status: { not: 'CANCELLED' } },
            }),
        ]);
        const inventoryValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
        const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;
        const outOfStock = products.filter((p) => !p.inStock || p.stock === 0).length;
        // Stock levels per product (top 10 by name for chart)
        const stockLevels = products.map((p) => ({
            name: p.name.length > 18 ? p.name.slice(0, 18) + '…' : p.name,
            stock: p.stock,
        }));
        // Monthly revenue: last 12 months
        const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();
        const monthlyRevenue = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const year = d.getFullYear();
            const month = d.getMonth();
            const total = orders
                .filter((o) => {
                const od = new Date(o.createdAt);
                return od.getFullYear() === year && od.getMonth() === month;
            })
                .reduce((acc, o) => acc + o.total, 0);
            monthlyRevenue.push({ name: MONTH_NAMES[month], value: total });
        }
        return {
            totalProducts: productCount,
            totalUsers: userCount,
            totalOrders: orderCount,
            inventoryValue,
            lowStock,
            outOfStock,
            stockLevels,
            monthlyRevenue,
            recentProducts,
        };
    }
}
exports.OrderService = OrderService;
