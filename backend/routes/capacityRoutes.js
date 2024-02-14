import express from 'express';
const capacityRouter = express.Router();
import { getCapacityByStudioId } from'../controllers/capacityWeekdayController.js';

capacityRouter.route('/').get(getCapacityByStudioId);

export {
    capacityRouter
}