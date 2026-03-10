import asyncHandler from 'express-async-handler';
import { Studio } from '../models/studioModel.js';
import { WeekdayCapacityModel } from '../models/capacityWeekdayModel.js';

// @desc    Get studio capacities
// @route   GET /api/studios
// @access  Public
const getCapacityByMagiclineId = asyncHandler(async (req, res) => {
    if (!req.query.magiclineId) {
        res.status(400);
        throw new Error('Please add magiclineId');
    }

    const studioModel = await Studio.findOne({ magiclineId: req.query.magiclineId });

    if (!studioModel) {
        throw new Error('Studio not found');
    }
    const capacities = await WeekdayCapacityModel.find({ studio: studioModel._id });

    res.status(200).json(capacities);
});

// @desc    Update studio weekday capacity
// @route   internal
// @access  Private
const updateCapacityByStudioId = async (studioModelId, weekday, values) => {
    const weekdayCapacity = await WeekdayCapacityModel.find({ studio: studioModelId, weekday: weekday });

    if(!weekdayCapacity) {
        throw new Error('weekdayCapacity not found');
    }

    const updatedStudio = await WeekdayCapacityModel.findOneAndUpdate({ studio: studioModelId, weekday: weekday }, { values: values }, { new: true,});
}

// @desc    Delete weekday capacity
// @route   internal
// @access  Private
const deleteCapacityByStudioId = async (studioModelId, weekday) => {
    const weekdayCapacity = await WeekdayCapacityModel.find({ studio: studioModelId, weekday: weekday });

    if(!weekdayCapacity) {
        throw new Error('weekdayCapacity not found');
    }

    await weekdayCapacity.deleteOne();
};

export {
    getCapacityByMagiclineId,
    updateCapacityByStudioId,
    deleteCapacityByStudioId,
}