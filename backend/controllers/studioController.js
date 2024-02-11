const asyncHandler = require('express-async-handler')

const Studio = require('../models/studioModel')
const WeekdayCapacity = require('../models/capacityWeekdayModel')

// @desc    Get studios
// @route   GET /api/studios
// @access  Public
const getStudios = asyncHandler(async (req, res) => {
    const studios = await Studio.find()

    res.status(200).json(studios)
})

// @desc    Set studio
// @route   POST /api/studios
// @access  Private
const setStudio = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.studioId) {
        res.status(400)
        throw new Error('Please add name field')
    }

    const studioDuplicate = await Studio.findOne({ studioId: req.body.studioId })

    if (!studioDuplicate) {
        const studio = await Studio.create({
            name: req.body.name,
            studioId: req.body.studioId,
        })

        const timetable = [
            {start: "00:00:00", end: "00:15:00", capacity: 0},
            {start: "00:16:00", end: "00:45:00", capacity: 0},
            {start: "00:46:00", end: "01:15:00", capacity: 0},
            {start: "01:16:00", end: "01:45:00", capacity: 0},
            {start: "01:46:00", end: "02:15:00", capacity: 0},
            {start: "02:16:00", end: "02:45:00", capacity: 0},
            {start: "02:46:00", end: "03:15:00", capacity: 0},
            {start: "03:16:00", end: "03:45:00", capacity: 0},
            {start: "03:46:00", end: "04:15:00", capacity: 0},
            {start: "04:16:00", end: "04:45:00", capacity: 0},
            {start: "04:46:00", end: "05:15:00", capacity: 0},
            {start: "05:16:00", end: "05:45:00", capacity: 0},
            {start: "05:46:00", end: "06:15:00", capacity: 0},
            {start: "06:16:00", end: "06:45:00", capacity: 0},
            {start: "06:46:00", end: "07:15:00", capacity: 0},
            {start: "07:16:00", end: "07:45:00", capacity: 0},
            {start: "07:46:00", end: "08:15:00", capacity: 0},
            {start: "08:16:00", end: "08:45:00", capacity: 0},
            {start: "08:46:00", end: "09:15:00", capacity: 0},
            {start: "09:16:00", end: "09:45:00", capacity: 0},
            {start: "09:46:00", end: "10:15:00", capacity: 0},
            {start: "10:16:00", end: "10:45:00", capacity: 0},
            {start: "10:46:00", end: "11:15:00", capacity: 0},
            {start: "11:16:00", end: "11:45:00", capacity: 0},
            {start: "11:46:00", end: "12:15:00", capacity: 0},
            {start: "12:16:00", end: "12:45:00", capacity: 0},
            {start: "12:46:00", end: "13:15:00", capacity: 0},
            {start: "13:16:00", end: "13:45:00", capacity: 0},
            {start: "13:46:00", end: "14:15:00", capacity: 0},
            {start: "14:16:00", end: "14:45:00", capacity: 0},
            {start: "14:46:00", end: "15:15:00", capacity: 0},
            {start: "15:16:00", end: "15:45:00", capacity: 0},
            {start: "15:46:00", end: "16:15:00", capacity: 0},
            {start: "16:16:00", end: "16:45:00", capacity: 0},
            {start: "16:46:00", end: "17:15:00", capacity: 0},
            {start: "17:16:00", end: "17:45:00", capacity: 0},
            {start: "17:46:00", end: "18:15:00", capacity: 0},
            {start: "18:16:00", end: "18:45:00", capacity: 0},
            {start: "18:46:00", end: "19:15:00", capacity: 0},
            {start: "19:16:00", end: "19:45:00", capacity: 0},
            {start: "19:46:00", end: "20:15:00", capacity: 0},
            {start: "20:16:00", end: "20:45:00", capacity: 0},
            {start: "20:46:00", end: "21:15:00", capacity: 0},
            {start: "21:16:00", end: "21:45:00", capacity: 0},
            {start: "21:46:00", end: "22:15:00", capacity: 0},
            {start: "22:16:00", end: "22:45:00", capacity: 0},
            {start: "22:46:00", end: "23:15:00", capacity: 0},
            {start: "23:15:00", end: "23:59:00", capacity: 0},
        ]

        for (let i = 0; i < 7; i++) {
            await WeekdayCapacity.create({
                studio: studio._id,
                weekday: i,
                values: timetable
            })
        }
        res.status(200).json(studio)
    }

    res.status(500)
})

// @desc    Update studio
// @route   PUT /api/studios/:id
// @access  Private
const updateStudio = asyncHandler(async (req, res) => {
    const studio = await Studio.findById(req.params.id)

    if(!studio) {
        res.status(400)
        throw new Error('Studio not found')
    }
    
    if (!req.body.name || !req.body.studioId) {
        res.status(400)
        throw new Error('Please add name field')
    }

    const updatedStudio = await Studio.findByIdAndUpdate(req.params.id, {name: req.body.name, studioId: req.body.studioId}, { new: true,})

    res.status(200).json(updatedStudio)
})

// @desc    Delete studios
// @route   DELETE /api/studios
// @access  Public
const deleteStudio = asyncHandler(async (req, res) => {
    const studio = await Studio.findById(req.params.id)

    if(!studio) {
        res.status(400)
        throw new Error('Studio not found')
    }

    await studio.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getStudios,
    setStudio,
    updateStudio,
    deleteStudio,
}