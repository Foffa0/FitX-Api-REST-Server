import express from 'express';
const capacityRouter = express.Router();
import { getCapacityByMagiclineId } from'../controllers/capacityWeekdayController.js';

capacityRouter.route('/').get(getCapacityByMagiclineId);

export {
    capacityRouter
}