const mongoose = require('mongoose')

const studioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studioId: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Studio', studioSchema)