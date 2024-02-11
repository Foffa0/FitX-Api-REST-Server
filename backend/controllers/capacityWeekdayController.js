const asyncHandler = require('express-async-handler')

const CapacityWeekday = require('../models/capacityWeekdayModel')
const Studio = require('../models/studioModel')

// @desc    Get studio capacities
// @route   GET /api/studios
// @access  Public
const getCapacityByStudioId = asyncHandler(async (req, res) => {
    if (!req.body.studioId) {
        res.status(400)
        throw new Error('Please add studioId')
    }

    const studioModel = await Studio.findOne({ studioId: req.body.studioId })

    //await setCapacityByStudioId(studioModel._id, 0)
    if (!studioModel) {
        throw new Error('Studio not found')
    }
    const capacities = await CapacityWeekday.find({ studio: studioModel._id })

    res.status(200).json(capacities)
})

// @desc    Set studio capacity for a weekday
// @route   internal
// @access  Private
const setCapacityByStudioId = async (studioModelId, weekday) => {   
    const weekdayCapacity = await CapacityWeekday.create({
        studio: studioModelId,
        weekday: weekday,
    })

    console.log(`Created Weekday capacity: ${weekdayCapacity}`)
}

// @desc    Update studio weekday capacity
// @route   internal
// @access  Private
const updateCapacityByStudioId = asyncHandler(async (studioModelId, weekday, vals) => {
    const weekdayCapacity = await CapacityWeekday.find({ studio: studioModelId, weekday: weekday })

    if(!weekdayCapacity) {
        throw new Error('weekdayCapacity not found')
    }

    const updatedStudio = await CapacityWeekday.findOneAndUpdate({ studio: studioModelId, weekday: weekday }, { values: vals }, { new: true,})

    console.log(`Updated Weekday capacity: ${updatedStudio}`)
})

// @desc    Delete weekday capacity
// @route   internal
// @access  Private
const deleteCapacityByStudioId = asyncHandler(async (studioModelId, weekday) => {
    const weekdayCapacity = await CapacityWeekday.find({ studio: studioModelId, weekday: weekday })

    if(!weekdayCapacity) {
        throw new Error('weekdayCapacity not found')
    }

    await weekdayCapacity.deleteOne()
})

module.exports = {
    getCapacityByStudioId,
    setCapacityByStudioId,
    updateCapacityByStudioId,
    deleteCapacityByStudioId,
}