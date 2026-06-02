"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => async (req, _res, next) => {
    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        // Write transformed/stripped values back so controllers see clean data
        if (parsed.body !== undefined)
            req.body = parsed.body;
        if (parsed.query !== undefined)
            req.query = parsed.query;
        if (parsed.params !== undefined)
            req.params = parsed.params;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            next(error); // Passes to global error handler
        }
        else {
            next(error);
        }
    }
};
exports.validateRequest = validateRequest;
