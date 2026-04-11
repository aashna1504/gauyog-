"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const cart_service_1 = require("./cart.service");
const helpers_1 = require("../../utils/helpers");
const getCart = async (req, res, next) => {
    try {
        const cart = await cart_service_1.CartService.getCart(req.user.userId);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Cart retrieved successfully', cart));
    }
    catch (error) {
        next(error);
    }
};
exports.getCart = getCart;
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const item = await cart_service_1.CartService.addToCart(req.user.userId, productId, quantity);
        res.status(201).json((0, helpers_1.formatResponse)(true, 'Item added to cart successfully', item));
    }
    catch (error) {
        next(error);
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const item = await cart_service_1.CartService.updateCartItemQuantity(req.user.userId, req.params.id, quantity);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Cart item updated successfully', item));
    }
    catch (error) {
        next(error);
    }
};
exports.updateCartItem = updateCartItem;
const removeCartItem = async (req, res, next) => {
    try {
        await cart_service_1.CartService.removeCartItem(req.user.userId, req.params.id);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Item removed from cart successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.removeCartItem = removeCartItem;
const clearCart = async (req, res, next) => {
    try {
        await cart_service_1.CartService.clearCart(req.user.userId);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Cart cleared successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.clearCart = clearCart;
