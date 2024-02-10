const asyncHandler = require('express-async-handler')

const Studio = require('../models/studioModel')

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
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add name field')
    }

    const studio = await Studio.create({
        name: req.body.name,
        studioId: req.body.studioId,
    })

    res.status(200).json(studio)
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

    const updatedStudio = await Studio.findByIdAndUpdate(req.params.id, req.body, { new: true,})

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