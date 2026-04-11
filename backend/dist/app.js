"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = require("./middleware/error.middleware");
// Routes
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const product_routes_1 = __importDefault(require("./modules/product/product.routes"));
const cart_routes_1 = __importDefault(require("./modules/cart/cart.routes"));
const wishlist_routes_1 = __importDefault(require("./modules/wishlist/wishlist.routes"));
const delivery_routes_1 = __importDefault(require("./modules/delivery/delivery.routes"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const contact_routes_1 = __importDefault(require("./modules/contact/contact.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
});
// API Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
app.use('/api/wishlist', wishlist_routes_1.default);
app.use('/api/delivery', delivery_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
