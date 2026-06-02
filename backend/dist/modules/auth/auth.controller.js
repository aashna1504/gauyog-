"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.resetPassword = exports.forgotPassword = exports.refresh = exports.logout = exports.googleAuth = exports.login = exports.signup = void 0;
const auth_service_1 = require("./auth.service");
const helpers_1 = require("../../utils/helpers");
const signup = async (req, res, next) => {
    try {
        const result = await auth_service_1.AuthService.signup(req.body);
        res.status(201).json((0, helpers_1.formatResponse)(true, 'Signup successful', result));
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        const result = await auth_service_1.AuthService.login(req.body);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Login successful', result));
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const googleAuth = async (req, res, next) => {
    try {
        const result = await auth_service_1.AuthService.googleAuth(req.body.credential, req.body.access_token);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Google authentication successful', result));
    }
    catch (error) {
        next(error);
    }
};
exports.googleAuth = googleAuth;
const logout = async (req, res, next) => {
    try {
        if (req.user) {
            await auth_service_1.AuthService.logout(req.user.userId);
        }
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Logout successful'));
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await auth_service_1.AuthService.refreshToken(refreshToken);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Token refreshed successfully', result));
    }
    catch (error) {
        next(error);
    }
};
exports.refresh = refresh;
const forgotPassword = async (req, res, next) => {
    try {
        const result = await auth_service_1.AuthService.forgotPassword(req.body.email);
        const isDev = process.env.NODE_ENV === 'development';
        // In production we always return the same message (prevents email enumeration)
        // In dev we include the reset link directly so the full flow can be tested
        res.status(200).json((0, helpers_1.formatResponse)(true, result?.emailDelivered
            ? 'Reset link sent! Check your email inbox.'
            : 'If an account with this email exists, a reset link has been sent.', isDev ? { devResetLink: result?.devResetLink ?? null, emailDelivered: result?.emailDelivered ?? false } : null));
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    try {
        await auth_service_1.AuthService.resetPassword(req.body.token, req.body.password);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Password reset successful'));
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const getProfile = async (req, res, next) => {
    try {
        const user = await auth_service_1.AuthService.getProfile(req.user.userId);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Profile retrieved', user));
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const user = await auth_service_1.AuthService.updateProfile(req.user.userId, req.body.name);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Profile updated', user));
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
