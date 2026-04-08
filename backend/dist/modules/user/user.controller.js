"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const user_service_1 = require("./user.service");
const helpers_1 = require("../../utils/helpers");
const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search;
        const result = await user_service_1.UserService.getAllUsers(page, limit, search);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Users retrieved successfully', result));
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res, next) => {
    try {
        const user = await user_service_1.UserService.getUserById(req.params.id);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'User retrieved successfully', user));
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    try {
        const user = await user_service_1.UserService.updateUser(req.params.id, req.body);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'User updated successfully', user));
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        await user_service_1.UserService.deleteUser(req.params.id);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'User deleted successfully', null));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const getUserStats = async (req, res, next) => {
    try {
        const stats = await user_service_1.UserService.getUserStats();
        res.status(200).json((0, helpers_1.formatResponse)(true, 'User stats retrieved successfully', stats));
    }
    catch (error) {
        next(error);
    }
};
exports.getUserStats = getUserStats;
