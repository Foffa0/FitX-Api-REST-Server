const asyncHandler = require('express-async-handler')

// @desc    Get studios
// @route   GET /api/studios
// @access  Public
const getStudios = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get studios'})
})

// @desc    Set studio
// @route   POST /api/studios
// @access  Private
const setStudio = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text field')
    }
    res.status(200).json({ message: 'Set studio'})
})

// @desc    Update studio
// @route   PUT /api/studios/:id
// @access  Private
const updateStudio = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}`})
})

// @desc    Delete studios
// @route   DELETE /api/studios
// @access  Public
const deleteStudio = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getStudios,
    setStudio,
    updateStudio,
    deleteStudio,
}