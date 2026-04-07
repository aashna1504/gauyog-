import { Request, Response, NextFunction } from 'express';
import { DeliveryService } from './delivery.service';
import { formatResponse } from '../../utils/helpers';

export const getDeliveryDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const details = await DeliveryService.getDeliveryDetails(req.user!.userId);
    res.status(200).json(formatResponse(true, 'Delivery details retrieved', details));
  } catch (error) {
    next(error);
  }
};

export const upsertDeliveryDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const details = await DeliveryService.upsertDeliveryDetails(req.user!.userId, req.body);
    res.status(200).json(formatResponse(true, 'Delivery details saved', details));
  } catch (error) {
    next(error);
  }
};
