"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertDeliveryDetails = exports.getDeliveryDetails = void 0;
const delivery_service_1 = require("./delivery.service");
const helpers_1 = require("../../utils/helpers");
const getDeliveryDetails = async (req, res, next) => {
    try {
        const details = await delivery_service_1.DeliveryService.getDeliveryDetails(req.user.userId);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Delivery details retrieved', details));
    }
    catch (error) {
        next(error);
    }
};
exports.getDeliveryDetails = getDeliveryDetails;
const upsertDeliveryDetails = async (req, res, next) => {
    try {
        const details = await delivery_service_1.DeliveryService.upsertDeliveryDetails(req.user.userId, req.body);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Delivery details saved', details));
    }
    catch (error) {
        next(error);
    }
};
exports.upsertDeliveryDetails = upsertDeliveryDetails;
