"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.addToWishlist = exports.getWishlist = void 0;
const wishlist_service_1 = require("./wishlist.service");
const helpers_1 = require("../../utils/helpers");
const getWishlist = async (req, res, next) => {
    try {
        const items = await wishlist_service_1.WishlistService.getWishlist(req.user.userId);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Wishlist retrieved successfully', items));
    }
    catch (error) {
        next(error);
    }
};
exports.getWishlist = getWishlist;
const addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const item = await wishlist_service_1.WishlistService.addToWishlist(req.user.userId, productId);
        res.status(201).json((0, helpers_1.formatResponse)(true, 'Added to wishlist', item));
    }
    catch (error) {
        next(error);
    }
};
exports.addToWishlist = addToWishlist;
const removeFromWishlist = async (req, res, next) => {
    try {
        await wishlist_service_1.WishlistService.removeFromWishlist(req.user.userId, req.params.productId);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Removed from wishlist'));
    }
    catch (error) {
        next(error);
    }
};
exports.removeFromWishlist = removeFromWishlist;
