"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_schema_1 = require("./user.schema");
const router = (0, express_1.Router)();
// All user management routes require admin auth
router.use(auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'));
router.get('/', (0, validate_middleware_1.validateRequest)(user_schema_1.getUsersSchema), user_controller_1.getUsers);
router.get('/stats', user_controller_1.getUserStats);
router.get('/:id', (0, validate_middleware_1.validateRequest)(user_schema_1.getUserSchema), user_controller_1.getUser);
router.patch('/:id', (0, validate_middleware_1.validateRequest)(user_schema_1.updateUserSchema), user_controller_1.updateUser);
router.delete('/:id', (0, validate_middleware_1.validateRequest)(user_schema_1.deleteUserSchema), user_controller_1.deleteUser);
exports.default = router;
