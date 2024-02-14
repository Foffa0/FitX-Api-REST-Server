import express from 'express';
const studioRouter = express.Router();
import { getStudios, setStudio } from '../controllers/studioController.js';

studioRouter.route('/').get(getStudios).post(setStudio);

export {
    studioRouter
} 