import express from 'express';
const studioRouter = express.Router();
import { getStudios, setStudio, updateStudio, deleteStudio } from '../controllers/studioController.js';

studioRouter.route('/').get(getStudios).post(setStudio);

studioRouter.route('/:id').delete(deleteStudio).put(updateStudio);

export {
    studioRouter
} 