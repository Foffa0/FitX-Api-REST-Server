import asyncHandler from 'express-async-handler';
import { Studio } from '../models/studioModel.js';
import { WeekdayCapacityModel } from '../models/capacityWeekdayModel.js';

// @desc    Get studio capacities
// @route   GET /api/studios
// @access  Public
const getCapacityByStudioId = asyncHandler(async (req, res) => {
    if (!req.query.studioId) {
        res.status(400);
        throw new Error('Please add studioId');
    }

    const studioModel = await Studio.findOne({ studioId: req.query.studioId });

    //await setCapacityByStudioId(studioModel._id, 0)
    if (!studioModel) {
        throw new Error('Studio not found');
    }
    const capacities = await WeekdayCapacityModel.find({ studio: studioModel._id });

    res.status(200).json(capacities);
});

// @desc    Set studio capacity for a weekday
// @route   internal
// @access  Private
const setCapacityByStudioId = async (studioModelId, weekday) => {   
    const weekdayCapacity = await WeekdayCapacityModel.create({
        studio: studioModelId,
        weekday: weekday,
    });
}

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
    getCapacityByStudioId,
    setCapacityByStudioId,
    updateCapacityByStudioId,
    deleteCapacityByStudioId,
}